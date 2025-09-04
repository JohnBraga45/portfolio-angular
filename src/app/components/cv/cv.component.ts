import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

// Utility function for class names
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  animations: [
    trigger('containerAnimation', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [
        animate('300ms ease-out', style({ opacity: 1 })),
        query('.item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('itemAnimation', [
      state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('500ms ease-out'))
    ]),
    trigger('skillAnimation', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('400ms ease-out'))
    ]),
    trigger('badgeAnimation', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden => visible', animate('300ms ease-out'))
    ])
  ]
})
export class CVComponent implements OnInit {
  animationState = 'hidden';
  
  // CV Data
  personalInfo = {
    name: 'DIONÍSIO BRAGA',
    title: 'Frontend Developer & AI Automation Specialist',
    phone: '+351 920 797 741',
    email: 'dionisiobraga551@gmail.com',
    location: 'Setúbal, Portugal',
    website: 'dionisiobraga.vercel.app'
  };

  experience = [
    {
      title: 'Frontend Developer',
      company: 'National Police of Angola (PNA) • Telecom & IT Department',
      period: 'Apr 2022 – Dec 2024',
      description: 'Developed and maintained dynamic and responsive user interfaces using Angular, HTML, and CSS. Collaborated closely with backend teams to optimize REST API integrations and improve overall performance.',
      technologies: ['Angular', 'HTML', 'CSS', 'REST API']
    },
    {
      title: 'Frontend Developer',
      company: 'FieldBright (Remote - Brazil)',
      period: 'Jan 2021 – Dec 2021',
      description: 'Developed performant user interfaces using Next.js and React.js, prioritizing SEO and scalability. Created reusable UI components with HTML, CSS, and styled components for high-traffic applications. Worked on state management and data handling with Redux and REST API integrations.',
      technologies: ['Next.js', 'React.js', 'Redux', 'Styled Components', 'SEO']
    },
    {
      title: 'Web Developer',
      company: 'ConnectSolution (Freelance)',
      period: 'Jun 2020 – Dec 2020',
      description: 'Built web and mobile business solutions with a focus on responsive design and UI performance. Integrated React Native features to enhance mobile user experience.',
      technologies: ['React Native', 'Responsive Design', 'Mobile Development']
    }
  ];

  education = [
    {
      degree: 'Web Development Course',
      institution: 'Self-taught',
      period: '2022 - 2023',
      description: 'Comprehensive training in modern web technologies, including JavaScript frameworks, REST APIs and full-stack development.'
    }
  ];

  skills = {
    technical: [
      'JavaScript/TypeScript',
      'Angular',
      'React',
      'Vue.js',
      'Node.js',
      'HTML5/CSS3',
      'Tailwind CSS',
      'Git/GitHub',
      'REST APIs',
      'MongoDB',
      'PostgreSQL'
    ],
    tools: [
      'VS Code',
      'Figma',
      'Adobe XD',
      'Postman',
      'Docker',
      'Vercel',
      'Netlify'
    ],
    languages: [
      { name: 'Portuguese', level: 'Native' },
      { name: 'English', level: 'Intermediate' },
      { name: 'Spanish', level: 'Basic' }
    ]
  };

  projects = [
    {
      name: 'E-commerce React.js',
      description: 'Complete e-commerce platform with shopping cart, payment integration and administrative panel.',
      technologies: ['React.js', 'Redux', 'Stripe API', 'PayPal API', 'Node.js', 'MongoDB']
    },
    {
      name: 'Crypto Dashboard',
      description: 'Cryptocurrency tracking dashboard with interactive charts and real-time data.',
      technologies: ['Angular', 'Chart.js', 'CoinGecko API', 'RxJS']
    },
    {
      name: 'Email Sender App',
      description: 'Mass email sending application with intuitive interface and data validation.',
      technologies: ['Node.js', 'Express', 'Nodemailer', 'Angular']
    }
  ];

  ngOnInit() {
    // Trigger animation after component initialization
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100);
  }

  // Utility method for class names
  cn(...classes: (string | undefined | null | false)[]): string {
    return cn(...classes);
  }

  // Get badge variant classes
  getBadgeClasses(variant: string = 'default'): string {
    const variants: { [key: string]: string } = {
      default: "border-transparent bg-gray-900 text-white hover:bg-gray-800",
      secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
      destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
      outline: "text-gray-900 border-gray-300 hover:bg-gray-50"
    };
    
    return this.cn(
      "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
      variants[variant]
    );
  }
}