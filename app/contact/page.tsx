"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  Globe,
  Zap,
  Building2,
  Headphones,
  Check,
  Clock,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { useChat } from "@/components/chatbot/chat-context";
import { GoogleMap, PAVIT_LOCATION } from "@/components/map";
import {
  sendContactMessage,
  MailApiError,
  getValidationErrors,
} from "@/lib/mail-client";

// Intent options for step 1
const intentOptions = [
  {
    id: "demo",
    label: "Request a Demo",
    description: "See PavitInfoTech in action with a personalized walkthrough",
    icon: Zap,
  },
  {
    id: "pricing",
    label: "Get Pricing",
    description: "Receive a custom quote based on your device count",
    icon: Building2,
  },
  {
    id: "support",
    label: "Technical Support",
    description: "Get help from our engineering team",
    icon: Headphones,
  },
  {
    id: "partnership",
    label: "Partnership Inquiry",
    description: "Explore integration or reseller opportunities",
    icon: Globe,
  },
];

// FAQ data
const faqData = [
  {
    question: "Do you support legacy hardware?",
    answer:
      "Yes. PavitInfoTech is protocol-agnostic and supports Modbus, OPC-UA, MQTT, and custom protocols. Our edge gateway translates legacy signals to modern APIs without replacing existing equipment.",
  },
  {
    question: "What is the pricing model?",
    answer:
      "We offer tiered pricing based on connected device count: Starter (up to 100 devices), Professional (up to 1,000 devices), and Enterprise (unlimited). Annual billing saves 20%. All plans include core analytics and 24/7 monitoring.",
  },
  {
    question: "Is on-premise deployment available?",
    answer:
      "Absolutely. While our cloud platform offers the fastest time-to-value, we provide full on-premise and hybrid deployment options for organizations with strict data sovereignty requirements. Air-gapped installations are also supported.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Typical deployments range from 2-8 weeks depending on complexity. Our Professional Services team handles integration, training, and optimization. We offer a Rapid Start program for critical infrastructure projects.",
  },
  {
    question: "What security certifications do you have?",
    answer:
      "PavitInfoTech is SOC 2 Type II certified, GDPR compliant, and follows IEC 62443 industrial security standards. We undergo annual penetration testing and offer dedicated security reviews for enterprise customers.",
  },
];

export default function ContactPage() {
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    deviceCount: "",
    industry: "",
    message: "",
    urgency: "normal",
    demoTime: "",
    partnershipType: "",
    deployment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { openChat } = useChat();

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (submitError) setSubmitError(null);
  };

  // Build message for API based on intent and form data
  const buildContactMessage = (): string => {
    const intentLabel =
      intentOptions.find((o) => o.id === selectedIntent)?.label || "General";
    let message = `[${intentLabel}]\n\n`;
    message += `Company: ${formData.company}\n`;

    switch (selectedIntent) {
      case "demo":
        message += `Preferred Demo Time: ${
          formData.demoTime || "Not specified"
        }\n`;
        message += `\nChallenges:\n${formData.message || "Not provided"}`;
        break;
      case "pricing":
        message += `Device Count: ${formData.deviceCount || "Not specified"}\n`;
        message += `Industry: ${formData.industry || "Not specified"}\n`;
        message += `Deployment: ${formData.deployment || "Not specified"}\n`;
        break;
      case "support":
        message += `Urgency: ${formData.urgency}\n`;
        message += `\nIssue Description:\n${
          formData.message || "Not provided"
        }`;
        break;
      case "partnership":
        message += `Partnership Type: ${
          formData.partnershipType || "Not specified"
        }\n`;
        message += `\nDetails:\n${formData.message || "Not provided"}`;
        break;
      default:
        message += formData.message || "";
    }

    return message;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await sendContactMessage({
        name: formData.name,
        email: formData.email,
        message: buildContactMessage(),
      });
      setIsSubmitted(true);
    } catch (error) {
      if (error instanceof MailApiError) {
        const validationErrors = getValidationErrors(error);
        if (Object.keys(validationErrors).length > 0) {
          // Show first validation error
          setSubmitError(Object.values(validationErrors)[0]);
        } else {
          setSubmitError(error.message || "Failed to send message");
        }
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get step 2 fields based on intent
  const getStep2Fields = () => {
    switch (selectedIntent) {
      case "demo":
        return (
          <>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>
                Preferred Demo Date/Time
              </label>
              <Input
                type='text'
                name='demoTime'
                placeholder='e.g., Next Tuesday afternoon'
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>
                What challenges are you looking to solve?
              </label>
              <Textarea
                name='message'
                placeholder='Tell us about your current pain points...'
                rows={4}
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case "pricing":
        return (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Device Count</label>
                <Input
                  type='number'
                  name='deviceCount'
                  placeholder='e.g., 500'
                  value={formData.deviceCount}
                  onChange={handleInputChange}
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Industry</label>
                <select
                  name='industry'
                  className='w-full px-3 py-2 bg-background border border-input rounded-md text-sm'
                  onChange={handleInputChange}
                >
                  <option value=''>Select industry...</option>
                  <option value='manufacturing'>Manufacturing</option>
                  <option value='energy'>Energy & Utilities</option>
                  <option value='healthcare'>Healthcare</option>
                  <option value='logistics'>Logistics</option>
                  <option value='agriculture'>Smart Agriculture</option>
                  <option value='other'>Other</option>
                </select>
              </div>
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>
                Deployment Preference
              </label>
              <div className='flex gap-4'>
                {["Cloud", "On-Premise", "Hybrid"].map((option) => (
                  <label
                    key={option}
                    className='flex items-center gap-2 cursor-pointer'
                  >
                    <input
                      type='radio'
                      name='deployment'
                      value={option.toLowerCase()}
                      className='w-4 h-4 accent-primary'
                    />
                    <span className='text-sm'>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        );
      case "support":
        return (
          <>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Urgency Level</label>
              <div className='flex gap-2'>
                {[
                  {
                    value: "low",
                    label: "Low",
                    color: "bg-green-500/20 text-green-400 border-green-500/30",
                  },
                  {
                    value: "normal",
                    label: "Normal",
                    color:
                      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                  },
                  {
                    value: "critical",
                    label: "Critical",
                    color: "bg-red-500/20 text-red-400 border-red-500/30",
                  },
                ].map((level) => (
                  <button
                    key={level.value}
                    type='button'
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, urgency: level.value }))
                    }
                    className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                      formData.urgency === level.value
                        ? level.color
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Describe the Issue</label>
              <Textarea
                name='message'
                placeholder='Please describe the issue in detail...'
                rows={5}
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case "partnership":
        return (
          <>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Partnership Type</label>
              <select
                name='partnershipType'
                className='w-full px-3 py-2 bg-background border border-input rounded-md text-sm'
                onChange={handleInputChange}
              >
                <option value=''>Select type...</option>
                <option value='integration'>Technology Integration</option>
                <option value='reseller'>Reseller/VAR</option>
                <option value='consulting'>Implementation Partner</option>
                <option value='oem'>OEM/White Label</option>
              </select>
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>
                Tell us about your organization
              </label>
              <Textarea
                name='message'
                placeholder='Describe your company, target market, and partnership goals...'
                rows={4}
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      {/* Section 1: Minimalist Hero */}
      <section className='relative min-h-[40vh] flex items-center justify-center overflow-hidden'>
        {/* Background gradient */}
        <div className='absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background' />

        {/* Animated grid pattern */}
        <div className='absolute inset-0 opacity-20'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className='relative z-10 text-center px-4 py-24 mt-16'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-6'>
            Ready to <span className='text-primary'>optimize</span>?
          </h1>
          <p className='text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto'>
            Our engineers are ready to architect your solution.
          </p>
        </div>
      </section>

      {/* Section 2: Multi-Step Intelligent Form */}
      <section className='py-20 px-4'>
        <div className='max-w-3xl mx-auto'>
          {!isSubmitted ? (
            <Card className='p-8 md:p-12 border-primary/20 bg-card/50 backdrop-blur'>
              {/* Progress indicator */}
              <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-2'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentStep >= 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`w-16 h-0.5 transition-colors ${
                      currentStep >= 2 ? "bg-primary" : "bg-muted"
                    }`}
                  />
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentStep >= 2
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    2
                  </div>
                  <div
                    className={`w-16 h-0.5 transition-colors ${
                      currentStep >= 3 ? "bg-primary" : "bg-muted"
                    }`}
                  />
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentStep >= 3
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    3
                  </div>
                </div>
                <span className='text-sm text-muted-foreground'>
                  Step {currentStep} of 3
                </span>
              </div>

              {/* Step 1: Intent Selection */}
              {currentStep === 1 && (
                <div className='space-y-6'>
                  <div>
                    <h2 className='text-2xl font-semibold mb-2'>
                      How can we help you?
                    </h2>
                    <p className='text-muted-foreground'>
                      Select what best describes your inquiry
                    </p>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {intentOptions.map((option) => (
                      <button
                        key={option.id}
                        type='button'
                        onClick={() => setSelectedIntent(option.id)}
                        className={`p-6 rounded-xl border text-left transition-all hover:border-primary/50 hover:bg-primary/5 ${
                          selectedIntent === option.id
                            ? "border-primary bg-primary/10"
                            : "border-border"
                        }`}
                      >
                        <option.icon
                          className={`w-6 h-6 mb-3 ${
                            selectedIntent === option.id
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        <h3 className='font-semibold mb-1'>{option.label}</h3>
                        <p className='text-sm text-muted-foreground'>
                          {option.description}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className='flex justify-end'>
                    <Button
                      onClick={() => setCurrentStep(2)}
                      disabled={!selectedIntent}
                      className='gap-2'
                    >
                      Continue <ArrowRight className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Conditional Fields Based on Intent */}
              {currentStep === 2 && (
                <div className='space-y-6'>
                  <div>
                    <h2 className='text-2xl font-semibold mb-2'>
                      Tell us more
                    </h2>
                    <p className='text-muted-foreground'>
                      {selectedIntent === "demo" &&
                        "Help us prepare the perfect demo for you"}
                      {selectedIntent === "pricing" &&
                        "We will create a custom quote for your needs"}
                      {selectedIntent === "support" &&
                        "Describe your issue so we can help faster"}
                      {selectedIntent === "partnership" &&
                        "Tell us about your partnership goals"}
                    </p>
                  </div>

                  <div className='space-y-4'>{getStep2Fields()}</div>

                  <div className='flex justify-between'>
                    <Button
                      variant='outline'
                      onClick={() => setCurrentStep(1)}
                      className='gap-2'
                    >
                      <ArrowLeft className='w-4 h-4' /> Back
                    </Button>
                    <Button onClick={() => setCurrentStep(3)} className='gap-2'>
                      Continue <ArrowRight className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {currentStep === 3 && (
                <div className='space-y-6'>
                  <div>
                    <h2 className='text-2xl font-semibold mb-2'>
                      Your contact details
                    </h2>
                    <p className='text-muted-foreground'>
                      How should we reach you?
                    </p>
                  </div>

                  <div className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium'>Name *</label>
                        <Input
                          name='name'
                          placeholder='Your full name'
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium'>
                          Work Email *
                        </label>
                        <Input
                          type='email'
                          name='email'
                          placeholder='you@company.com'
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Company *</label>
                      <Input
                        name='company'
                        placeholder='Your organization'
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Error message */}
                  {submitError && (
                    <div className='flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400'>
                      <AlertCircle className='w-5 h-5 shrink-0' />
                      <span className='text-sm'>{submitError}</span>
                    </div>
                  )}

                  <div className='flex justify-between'>
                    <Button
                      variant='outline'
                      onClick={() => setCurrentStep(2)}
                      className='gap-2'
                    >
                      <ArrowLeft className='w-4 h-4' /> Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={
                        isSubmitting ||
                        !formData.name ||
                        !formData.email ||
                        !formData.company
                      }
                      className='gap-2 min-w-[140px]'
                    >
                      {isSubmitting ? (
                        <>
                          <div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit <ArrowRight className='w-4 h-4' />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ) : (
            /* Success State */
            <Card className='p-12 text-center border-primary/20 bg-card/50 backdrop-blur'>
              <div className='w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6'>
                <Check className='w-8 h-8 text-green-400' />
              </div>
              <h2 className='text-2xl font-semibold mb-2'>Message Sent!</h2>
              <p className='text-muted-foreground mb-6'>
                Our team will reach out within 2 hours during business hours.
              </p>
              <Button
                variant='outline'
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setSelectedIntent(null);
                  setSubmitError(null);
                  setFormData({
                    name: "",
                    email: "",
                    company: "",
                    deviceCount: "",
                    industry: "",
                    message: "",
                    urgency: "normal",
                    demoTime: "",
                    partnershipType: "",
                    deployment: "",
                  });
                }}
              >
                Send Another Message
              </Button>
            </Card>
          )}
        </div>
      </section>

      {/* Section 3: Office Location Map */}
      <section className='py-20 px-4 bg-muted/30'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold font-serif mb-4'>
              Visit Our Office
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Located in the heart of San Francisco's innovation district
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Map */}
            <div className='lg:col-span-2'>
              <Card className='overflow-hidden p-0'>
                <GoogleMap
                  address={PAVIT_LOCATION.address}
                  zoom={15}
                  className='h-[400px] lg:h-[500px]'
                />
              </Card>
            </div>

            {/* Office Info */}
            <div className='space-y-6'>
              <Card className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
                    <MapPin className='w-6 h-6 text-primary' />
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>Headquarters</h3>
                    <p className='text-sm text-muted-foreground'>
                      {PAVIT_LOCATION.address}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
                    <Clock className='w-6 h-6 text-primary' />
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>Office Hours</h3>
                    <div className='text-sm text-muted-foreground space-y-1'>
                      <p>Monday – Friday: 9:00 AM – 6:00 PM PT</p>
                      <p>Saturday – Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
                    <Globe className='w-6 h-6 text-primary' />
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>Remote-First Culture</h3>
                    <p className='text-sm text-muted-foreground'>
                      Our team works globally. Schedule a virtual meeting
                      anytime!
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: FAQ Accordion */}
      <section className='py-20 px-4'>
        <div className='max-w-3xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold font-serif mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-lg text-muted-foreground'>
              Quick answers to common questions
            </p>
          </div>

          <div className='space-y-4'>
            {faqData.map((faq, index) => (
              <Card
                key={index}
                className={`overflow-hidden py-0 gap-0 transition-colors ${
                  expandedFaq === index ? "border-primary/50" : ""
                }`}
              >
                <button
                  type='button'
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className='w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors'
                >
                  <span className='font-semibold'>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className='px-6 pb-6 text-muted-foreground'>
                    {faq.answer}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Direct Channels */}
      <section className='py-20 px-4 bg-muted/30'>
        <div className='max-w-5xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold font-serif mb-4'>
              Direct Channels
            </h2>
            <p className='text-lg text-muted-foreground'>
              Prefer to reach us directly? Here are more ways to connect.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Email */}
            <Card className='p-8 text-center hover:border-primary/50 transition-colors group'>
              <div className='w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors'>
                <Mail className='w-7 h-7 text-primary' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>Email Us</h3>
              <p className='text-muted-foreground text-sm mb-4'>
                For detailed inquiries
              </p>
              <a
                href='mailto:hello@pavitinfotech.com'
                className='text-primary hover:underline font-medium'
              >
                hello@pavitinfotech.com
              </a>
            </Card>

            {/* Phone */}
            <Card className='p-8 text-center hover:border-primary/50 transition-colors group'>
              <div className='w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors'>
                <Phone className='w-7 h-7 text-primary' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>Call Us</h3>
              <p className='text-muted-foreground text-sm mb-4'>
                Mon–Fri, 9 AM – 6 PM PT
              </p>
              <a
                href='tel:+1-888-555-0123'
                className='text-primary hover:underline font-medium'
              >
                +1 (888) 555-0123
              </a>
            </Card>

            {/* Chat with Sales AI */}
            <Card className='p-8 text-center hover:border-primary/50 transition-colors group relative overflow-hidden'>
              {/* Animated gradient background */}
              <div className='absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity' />

              <div className='relative'>
                <div className='w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors'>
                  <MessageSquare className='w-7 h-7 text-primary' />
                </div>
                <h3 className='text-lg font-semibold mb-2'>
                  Chat with Sales AI
                </h3>
                <p className='text-muted-foreground text-sm mb-4'>
                  Instant answers, 24/7
                </p>
                <Button
                  className='gap-2'
                  onClick={() => {
                    // open the chat widget via context
                    try {
                      openChat();
                    } catch {
                      const btn = document.querySelector(
                        "button[aria-label='Open chat']"
                      ) as HTMLButtonElement | null;
                      if (btn) btn.click();
                    }
                  }}
                >
                  <MessageSquare className='w-4 h-4' />
                  Start Chat
                </Button>
              </div>
            </Card>
          </div>

          {/* Enterprise Support Note */}
          <div className='mt-12 text-center'>
            <Card className='inline-flex items-center gap-3 px-6 py-3 border-primary/30 bg-primary/5'>
              <Headphones className='w-5 h-5 text-primary' />
              <span className='text-sm'>
                <strong>Enterprise customers:</strong> Access your dedicated
                support line in the dashboard.
              </span>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
