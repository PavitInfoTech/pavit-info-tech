export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  tags: string[]
  readTime: number
  featured: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "predictive-maintenance-iot",
    title: "Predictive Maintenance: The Future of IoT Operations",
    excerpt: "Learn how AI-powered predictive maintenance can reduce downtime and increase equipment lifespan.",
    content: `# Predictive Maintenance: The Future of IoT Operations

Predictive maintenance is revolutionizing how enterprises manage their IoT infrastructure. Instead of reactive repairs or scheduled maintenance, predictive maintenance uses AI and machine learning to anticipate failures before they occur.

## Why Predictive Maintenance Matters

Unplanned downtime costs enterprises an average of $5,600 per minute. Predictive maintenance can reduce downtime by up to 50% and maintenance costs by 20-25%.

## How It Works

Our AI engine analyzes patterns in sensor data to detect anomalies and predict failures with high accuracy. When a potential failure is detected, you receive alerts so you can schedule maintenance proactively.

## Real-World Results

Customers using our predictive maintenance capabilities have seen:
- 45% reduction in equipment failures
- 35% decrease in maintenance costs
- 60% improvement in asset uptime
- Better resource planning and scheduling

Start leveraging predictive maintenance today to maximize your IoT infrastructure efficiency.`,
    author: "Sarah Chen",
    date: "2025-01-15",
    category: "Technology",
    tags: ["IoT", "AI", "Maintenance", "Analytics"],
    readTime: 8,
    featured: true,
  },
  {
    id: "2",
    slug: "anomaly-detection-basics",
    title: "Getting Started with AI Anomaly Detection",
    excerpt: "Understand how anomaly detection works and why it's crucial for IoT security and operations.",
    content: `# Getting Started with AI Anomaly Detection

Anomaly detection is a critical component of modern IoT platforms. It helps identify unusual patterns that could indicate security threats, equipment failures, or operational issues.

## What is Anomaly Detection?

Anomaly detection uses machine learning algorithms to identify data points that deviate significantly from the expected pattern. In IoT contexts, these could represent:
- Security breaches
- Equipment malfunctions
- Sensor failures
- Unusual operating conditions

## Benefits of AI-Powered Anomaly Detection

- **Real-time monitoring**: Detect issues as they occur
- **Reduced false positives**: Smart algorithms learn your baseline
- **Automated responses**: Trigger alerts and actions automatically
- **Improved security**: Catch suspicious activity immediately

## Implementation Best Practices

1. Establish baseline metrics for your devices
2. Set appropriate sensitivity thresholds
3. Configure automated alerts and responses
4. Regularly review and tune your models
5. Document patterns and responses

Implementing anomaly detection can significantly improve your IoT operations and security posture.`,
    author: "Michael Rodriguez",
    date: "2025-01-10",
    category: "Technology",
    tags: ["Anomaly Detection", "Machine Learning", "Security"],
    readTime: 6,
    featured: true,
  },
  {
    id: "3",
    slug: "iot-security-best-practices",
    title: "10 IoT Security Best Practices for 2025",
    excerpt: "Essential security practices every IoT operator should implement to protect their infrastructure.",
    content: `# 10 IoT Security Best Practices for 2025

As IoT deployments grow, security becomes increasingly important. Here are 10 essential practices to protect your infrastructure.

## 1. End-to-End Encryption

Encrypt all data in transit and at rest. This ensures sensitive information remains protected throughout the data pipeline.

## 2. Device Authentication

Implement strong authentication mechanisms for all devices connecting to your platform. Use certificates and tokens to verify device identity.

## 3. Regular Firmware Updates

Keep device firmware up-to-date to patch security vulnerabilities and improve performance.

## 4. Network Segmentation

Isolate critical devices and systems on separate network segments to limit the impact of potential breaches.

## 5. Monitoring and Logging

Maintain comprehensive logs of all system access and activities for audit and investigation purposes.

## 6. Access Control

Implement role-based access control (RBAC) to ensure users have appropriate permissions for their roles.

## 7. Data Privacy

Comply with relevant regulations like GDPR, HIPAA, or CCPA depending on your industry and location.

## 8. Security Training

Train your team on security best practices and create a security-aware culture.

## 9. Incident Response Plans

Develop and test incident response procedures to quickly address security events.

## 10. Regular Security Audits

Conduct periodic security assessments and penetration testing to identify and address vulnerabilities.

Implementing these practices will significantly strengthen your IoT security posture.`,
    author: "James Wilson",
    date: "2025-01-05",
    category: "Security",
    tags: ["Security", "Best Practices", "IoT", "Compliance"],
    readTime: 10,
    featured: false,
  },
  {
    id: "4",
    slug: "digital-twins-explained",
    title: "Understanding Digital Twins in IoT",
    excerpt: "Explore how digital twins can revolutionize your IoT operations and decision-making.",
    content: `# Understanding Digital Twins in IoT

Digital twins are virtual replicas of physical devices or systems that enable monitoring, analysis, and optimization in real-time.

## What is a Digital Twin?

A digital twin is a virtual representation of a physical asset that mirrors its real-world counterpart. It continuously updates based on real-time sensor data and can simulate different scenarios.

## Key Benefits

- **Real-time monitoring**: View your physical assets from anywhere
- **Predictive analysis**: Simulate scenarios before implementing changes
- **Optimization**: Test improvements in a virtual environment first
- **Training and simulation**: Use for operator training without disrupting operations

## Use Cases

Digital twins are transforming industries:
- **Manufacturing**: Optimize production lines and identify bottlenecks
- **Energy**: Monitor power grids and predict infrastructure needs
- **Healthcare**: Simulate surgical procedures and medical facilities
- **Smart Cities**: Manage urban infrastructure and services

## Getting Started

Start with your most critical assets and gradually expand your digital twin implementation as you gain expertise and value.`,
    author: "Priya Patel",
    date: "2024-12-28",
    category: "Technology",
    tags: ["Digital Twins", "Visualization", "Analytics"],
    readTime: 7,
    featured: false,
  },
  {
    id: "5",
    slug: "iot-industry-trends-2025",
    title: "2025 IoT Industry Trends You Need to Know",
    excerpt: "Discover the top trends shaping IoT and what they mean for your business in 2025.",
    content: `# 2025 IoT Industry Trends You Need to Know

The IoT industry is evolving rapidly. Here are the key trends shaping 2025 and beyond.

## 1. Edge Computing Dominance

Processing data closer to the source reduces latency and bandwidth requirements, enabling faster decision-making.

## 2. AI Integration

AI is becoming standard in IoT platforms, powering anomaly detection, predictive maintenance, and automated optimization.

## 3. 5G Expansion

5G networks enable faster, more reliable IoT connectivity, supporting new use cases and applications.

## 4. Enhanced Security Focus

Security is moving from an afterthought to a core feature with zero-trust architectures and advanced threat detection.

## 5. Sustainability

IoT technologies are being leveraged to optimize energy consumption and reduce environmental impact.

## 6. Industry-Specific Solutions

Vertical-specific IoT solutions are emerging, tailored to unique requirements of different industries.

## 7. Autonomous Systems

Self-managing systems that require minimal human intervention are becoming increasingly common.

## 8. Data Privacy Regulations

Stricter data privacy laws are shaping how organizations collect, process, and store IoT data.

Stay ahead of these trends to maximize the value of your IoT investments.`,
    author: "Sarah Chen",
    date: "2024-12-20",
    category: "Industry",
    tags: ["Trends", "2025", "Technology", "Industry"],
    readTime: 9,
    featured: false,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category)
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))]
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}
