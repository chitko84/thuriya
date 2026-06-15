import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  Compass,
  FileText,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Landmark,
  LineChart,
  Megaphone,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserRoundCheck,
  Users,
  WalletCards,
} from 'lucide-react';
import { TRENDING_TALENT } from './trendingTalent';

export const QUICK_ACCESS = [
  {
    role: 'candidate',
    title: 'Candidate Workspace',
    email: 'candidate@careeros.com',
    view: 'candidate_panel',
    description: 'Explore career planning, opportunities, applications, and personal growth tools.',
    passwordKey: 'candidate-secure-access',
  },
  {
    role: 'employer',
    title: 'Employer Workspace',
    email: 'employer@careeros.com',
    view: 'employer_panel',
    description: 'Manage hiring, discover talent, and plan workforce growth.',
    passwordKey: 'employer-secure-access',
  },
  {
    role: 'university',
    title: 'University Workspace',
    email: 'university@careeros.com',
    view: 'university_panel',
    description: 'Track student outcomes, internships, and industry partnerships.',
    passwordKey: 'university-secure-access',
  },
  {
    role: 'admin',
    title: 'Admin Workspace',
    email: 'admin@careeros.com',
    view: 'admin_panel',
    description: 'Manage the platform ecosystem and oversee activity.',
    passwordKey: 'admin-secure-access',
  },
];

export function ensureWorkspaceAccounts() {
  if (localStorage.getItem('career_os_accounts_ready')) return;
  localStorage.setItem('career_os_accounts', JSON.stringify(QUICK_ACCESS));
  localStorage.setItem('career_os_accounts_ready', 'true');
}

const candidateRecords = {
  jobs: [
    ['Product Analyst Intern', 'Kuala Lumpur', 'RM 2,800', 'Strong match'],
    ['Junior Data Analyst', 'Petaling Jaya', 'RM 4,500', 'Saved'],
    ['Graduate Software Associate', 'Remote', 'RM 4,200', 'Applied'],
  ],
  applications: [
    ['Product Analyst Intern', 'Talentbank', 'Interview', 'Prepare examples'],
    ['Graduate Software Associate', 'Nusantara Cloud', 'Review', 'Add portfolio link'],
    ['Business Analyst Trainee', 'Maybank', 'Submitted', 'Follow up Friday'],
  ],
  learning: [
    ['SQL for Business Analysis', 'Coursera', '4 weeks', 'Start this week'],
    ['Portfolio Writing for Graduates', 'Career Centre', '2 hours', 'Recommended'],
    ['Interview Practice: Case Questions', 'LinkedIn Learning', '3 hours', 'Saved'],
  ],
};

const employerRecords = {
  candidates: [
    ['Aina Rahman', 'Product Analyst', 'Kuala Lumpur', 'Shortlist'],
    ['Daniel Lim', 'Software Associate', 'Remote', 'Interview'],
    ['Mei Tan', 'Marketing Analyst', 'Petaling Jaya', 'Review'],
  ],
  jobs: [
    ['Product Analyst Intern', 'Open', '48 applicants', 'Review weekly'],
    ['Junior Software Associate', 'Open', '31 applicants', 'Add salary range'],
    ['Graduate Marketing Analyst', 'Paused', '22 applicants', 'Reopen next month'],
  ],
  teams: [
    ['Analytics', '8 roles', 'Healthy', 'Add mentor capacity'],
    ['Software', '12 roles', 'Growing', 'Plan graduate intake'],
    ['Customer Success', '6 roles', 'Needs support', 'Review workload'],
  ],
};

const universityRecords = {
  students: [
    ['Aina Rahman', 'Business Analytics', 'Final year', 'Career ready'],
    ['Jason Wong', 'Computer Science', 'Year 3', 'Needs internship'],
    ['Nur Iman', 'Marketing', 'Final year', 'Portfolio review'],
  ],
  partners: [
    ['Talentbank', 'Internships', 'Active', '38 placements'],
    ['Nusantara Cloud', 'Capstone projects', 'Active', '6 projects'],
    ['Maybank', 'Graduate roles', 'Planning', 'Career talk'],
  ],
  courses: [
    ['Business Analytics Studio', 'Add employer project', 'High impact', 'August intake'],
    ['Software Practice', 'Add interview tasks', 'Medium impact', 'Next semester'],
    ['Career Readiness', 'Add LinkedIn review', 'High impact', 'This month'],
  ],
};

const adminRecords = {
  users: [
    ['Candidates', '12,482', 'Growing', 'Review signups'],
    ['Employers', '438', 'Active', 'Approve new companies'],
    ['Universities', '29', 'Active', 'Update partner list'],
  ],
  content: [
    ['Career guides', '84 articles', 'Published', 'Refresh top reads'],
    ['Opportunity listings', '312 open', 'Updated', 'Review closing dates'],
    ['Reports', '18 monthly packs', 'Ready', 'Send to partners'],
  ],
  activity: [
    ['Applications this week', '2,918', '+14%', 'Monitor response time'],
    ['Internship matches', '438', '+9%', 'Check partner capacity'],
    ['Profile completions', '6,204', '+18%', 'Share with universities'],
  ],
};

const module = (id, label, icon, purpose, records, form, chart, nextSteps) => ({
  id,
  label,
  icon,
  purpose,
  records,
  form,
  chart,
  nextSteps,
});

export const WORKSPACES = {
  candidate: {
    name: 'Candidate Workspace',
    welcome: 'Plan your next step with a clear view of your profile, applications, learning, and opportunities.',
    accent: '#111111',
    pages: [
      module('resume', 'Resume Builder', FileText, 'Create a polished resume and keep it ready for applications.', candidateRecords.applications, ['Resume title', 'Target role', 'Add section'], [82, 76, 91], ['Add one project result', 'Download current resume', 'Review work experience wording']),
      module('skills', 'Skills Profile', Award, 'Track the skills you have and the ones worth building next.', [['Excel', 'Advanced', 'Verified', 'Use in analyst roles'], ['SQL', 'Intermediate', 'In progress', 'Add project proof'], ['Communication', 'Strong', 'Verified', 'Use in interviews']], ['Skill name', 'Current level', 'Evidence link'], [90, 64, 78], ['Add SQL project evidence', 'Set a monthly learning target', 'Update interview examples']),
      module('jobs', 'Job Search', Search, 'Find roles that fit your interests, location, and readiness.', candidateRecords.jobs, ['Keyword', 'Location', 'Work type'], [78, 88, 66], ['Save two analyst roles', 'Filter by hybrid work', 'Compare salary ranges']),
      module('applications', 'Applications', ClipboardCheck, 'Keep every application moving with clear next actions.', candidateRecords.applications, ['Company', 'Role', 'Next action'], [35, 65, 82], ['Prepare for Talentbank interview', 'Send one follow-up', 'Attach portfolio link']),
      module('paths', 'Career Path Navigator', Compass, 'Explore possible career paths and what each path requires.', [['Product Analyst', '1-2 years', 'Business cases', 'Best fit'], ['Data Analyst', '1-2 years', 'SQL portfolio', 'Close fit'], ['Customer Insights Lead', '3-5 years', 'Stakeholder work', 'Future path']], ['Career interest', 'Preferred industry', 'Time horizon'], [62, 84, 71], ['Choose one primary path', 'Add missing skill proof', 'Review salary growth']),
      module('portfolio', 'Living Portfolio', Sparkles, 'Show projects, achievements, certificates, and activities in one place.', [['Market research dashboard', 'Project', 'Published', 'Add outcome'], ['Dean list award', 'Achievement', 'Verified', 'Feature on profile'], ['Data Analytics Certificate', 'Certificate', 'Completed', 'Attach badge']], ['Project name', 'Outcome', 'Link'], [74, 86, 69], ['Add project screenshots', 'Write a short case study', 'Feature best achievement']),
      module('coach', 'Career Coach', MessageCircle, 'Ask career questions and get practical next steps.', [['Interview answer', 'Draft ready', 'Use STAR format', 'Practice today'], ['Role comparison', 'Product Analyst vs Data Analyst', 'Product path fits interests', 'Review path page'], ['Learning plan', 'SQL first', 'Highest near-term value', 'Start course']], ['Question', 'Context', 'Goal'], [80, 73, 88], ['Ask for interview practice', 'Review one answer', 'Save a weekly action']),
      module('salary', 'Salary Insights', ChartNoAxesColumnIncreasing, 'Compare salary ranges and prepare for conversations with employers.', [['Product Analyst Intern', 'RM 2,500-3,200', 'Market range', 'Fair'], ['Junior Data Analyst', 'RM 4,000-5,800', 'Market range', 'Good target'], ['Software Associate', 'RM 3,800-5,200', 'Market range', 'Compare benefits']], ['Role', 'Location', 'Experience'], [58, 76, 92], ['Set a target range', 'Review benefits', 'Prepare salary question']),
      module('life', 'Life Planner', CalendarDays, 'Plan career breaks, study plans, and important life decisions without losing momentum.', [['Further study', '12 months', 'Higher long-term range', 'Consider later'], ['Career break', '3 months', 'Low impact with portfolio plan', 'Plan updates'], ['Role switch', '6 months', 'Needs focused learning', 'Start with shadowing']], ['Plan type', 'Start date', 'Concern'], [54, 68, 79], ['Create a 90-day plan', 'Keep one project active', 'Talk to a mentor']),
      module('brand', 'Personal Brand Builder', Megaphone, 'Improve your LinkedIn, portfolio, and professional story.', [['LinkedIn headline', 'Needs focus', 'Mention analyst direction', 'Update'], ['Portfolio summary', 'Good', 'Add measurable result', 'Improve'], ['Networking list', 'Ready', '12 people to contact', 'Start']], ['Profile link', 'Target audience', 'Main message'], [65, 72, 81], ['Rewrite headline', 'Add featured project', 'Send three connection notes']),
      module('opportunities', 'Opportunity Radar', Target, 'Track scholarships, competitions, events, and career opportunities.', candidateRecords.learning, ['Opportunity type', 'Deadline', 'Interest area'], [41, 77, 86], ['Apply for one scholarship', 'Register for career fair', 'Save two competitions']),
      module('learning', 'Learning Planner', BookOpen, 'Choose courses that are worth your time and support your next role.', candidateRecords.learning, ['Course goal', 'Weekly hours', 'Preferred provider'], [72, 83, 61], ['Start SQL course', 'Block two study sessions', 'Add certificate to portfolio']),
    ],
  },
  employer: {
    name: 'Employer Workspace',
    welcome: 'Hire with a clearer view of roles, candidates, teams, and future workforce needs.',
    accent: '#111111',
    pages: [
      module('company', 'Company Profile', Building2, 'Keep your company story, benefits, and hiring teams up to date.', [['VektorOps', 'Technology', 'Kuala Lumpur', 'Hiring graduates'], ['Benefits', 'Hybrid work', 'Learning budget', 'Published'], ['Teams', 'Analytics and Software', '20 open seats', 'Review']], ['Company name', 'Industry', 'Hiring focus'], [80, 72, 90], ['Add graduate story', 'Review benefits', 'Update hiring contacts']),
      module('jobs', 'Job Management', Briefcase, 'Create roles, manage applicants, and keep hiring work organized.', employerRecords.jobs, ['Role title', 'Salary range', 'Location'], [68, 85, 59], ['Add salary range', 'Review applicants', 'Close inactive role']),
      module('candidate-search', 'Candidate Search', Search, 'Find people by skills, location, readiness, and interests.', employerRecords.candidates, ['Skill', 'Location', 'Graduation year'], [88, 74, 69], ['Shortlist three candidates', 'Save search', 'Invite one candidate']),
      module('matching', 'Suggested Candidates', UserRoundCheck, 'See candidates who fit your role and why they are worth reviewing.', employerRecords.candidates, ['Role', 'Must-have skill', 'Nice-to-have skill'], [91, 83, 76], ['Compare top candidates', 'Send interview invite', 'Adjust role criteria']),
      module('retention', 'Retention Monitoring', HeartHandshake, 'Spot teams that need support before people disengage.', employerRecords.teams, ['Team', 'Concern', 'Support action'], [84, 70, 62], ['Add manager check-in', 'Review workload', 'Offer learning support']),
      module('reengagement', 'Candidate Re-Engagement', Handshake, 'Reconnect with strong past applicants and warm leads.', [['Priya S.', 'Past finalist', 'Now has internship experience', 'Contact'], ['Farid A.', 'Past applicant', 'Updated portfolio', 'Review'], ['June T.', 'Event attendee', 'Interested in analytics', 'Invite']], ['Candidate group', 'Message type', 'Role'], [73, 81, 69], ['Send update note', 'Review past finalists', 'Add nurture list']),
      module('new-hires', 'New Hire Success Tracker', ClipboardCheck, 'Help new hires settle in with milestones, mentors, and support.', [['Aina Rahman', 'Week 2', 'On track', 'Schedule mentor chat'], ['Daniel Lim', 'Week 4', 'Needs product context', 'Add buddy session'], ['Mei Tan', 'Week 1', 'On track', 'Share starter guide']], ['New hire', 'Milestone', 'Support needed'], [66, 82, 78], ['Assign mentors', 'Review first month goals', 'Share learning resources']),
      module('workforce', 'Workforce Planning', LineChart, 'Plan hiring needs by team, quarter, and business priority.', employerRecords.teams, ['Team', 'Quarter', 'Hiring need'], [55, 77, 89], ['Plan analytics intake', 'Review engineering roles', 'Set intern conversion target']),
      module('diversity', 'Diversity Dashboard', Users, 'Review hiring fairness and build stronger shortlists.', [['Applicant pool', 'Balanced', 'Good reach', 'Keep broad sourcing'], ['Interview stage', 'Needs review', 'Drop-off in one group', 'Review criteria'], ['Offers', 'Healthy', 'Fair range', 'Monitor monthly']], ['Hiring stage', 'Concern', 'Action'], [76, 64, 82], ['Review interview criteria', 'Broaden sourcing', 'Track offer outcomes']),
      module('growth', 'Internal Growth Planning', TrendingUp, 'Help employees move into new roles and grow within the company.', [['Support analyst to data analyst', '3 months', 'SQL and reporting', 'Plan'], ['Software associate to team lead', '6 months', 'Mentoring', 'Plan'], ['Recruiter to talent partner', '4 months', 'Workforce planning', 'Plan']], ['Employee group', 'Target role', 'Learning need'], [69, 74, 88], ['Create growth plan', 'Offer shadowing', 'Review promotion paths']),
      module('simulator', 'Future Hiring Plans', Landmark, 'Compare hiring plans before you commit budget and time.', [['Growth plan', '12 hires', 'Higher cost', 'Use if sales grows'], ['Steady plan', '6 hires', 'Balanced', 'Recommended'], ['Internship plan', '18 interns', 'Lower cost', 'Needs mentors']], ['Scenario', 'Budget', 'Hiring target'], [50, 71, 93], ['Choose steady plan', 'Check mentor capacity', 'Review salary ranges']),
      module('analytics', 'Hiring Analytics', ChartNoAxesColumnIncreasing, 'Track response times, offers, interviews, and hiring progress.', employerRecords.jobs, ['Metric', 'Date range', 'Team'], [61, 79, 84], ['Improve response time', 'Review stalled roles', 'Share weekly hiring report']),
    ],
  },
  university: {
    name: 'University Workspace',
    welcome: 'Support students from study to work with outcomes, internships, learning records, and employer partnerships.',
    accent: '#111111',
    pages: [
      module('profile', 'University Profile', GraduationCap, 'Manage departments, programmes, contacts, and partner-facing information.', [['Apex Tech University', '29 programmes', 'Career Centre active', 'Update'], ['Computer Science', '1,240 students', 'Strong employer demand', 'Review'], ['Business School', '980 students', 'Growing internships', 'Review']], ['Department', 'Programme', 'Career contact'], [78, 84, 66], ['Update department contacts', 'Publish programme overview', 'Review partner list']),
      module('students', 'Student Tracking', Users, 'Follow student progress, readiness, and support needs.', universityRecords.students, ['Student name', 'Programme', 'Support need'], [70, 82, 59], ['Review final-year students', 'Assign advisor', 'Check profile completion']),
      module('graduates', 'Graduate Tracking', ClipboardCheck, 'Track graduate destinations and employment outcomes.', [['Class of 2025', '76% employed', '6 months', 'Update'], ['Class of 2024', '82% employed', '12 months', 'Review'], ['Class of 2023', '85% employed', '24 months', 'Publish']], ['Cohort', 'Outcome', 'Date range'], [76, 82, 85], ['Update latest outcomes', 'Compare programmes', 'Prepare partner report']),
      module('internships', 'Internship Marketplace', Briefcase, 'Connect students with internships and manage placements.', [['Product Analyst Intern', 'Talentbank', '14 applicants', 'Match students'], ['Cloud Support Intern', 'Nusantara Cloud', '9 applicants', 'Review'], ['Marketing Research Intern', 'Maybank', '22 applicants', 'Shortlist']], ['Role', 'Employer', 'Deadline'], [64, 77, 81], ['Match eligible students', 'Confirm employer slots', 'Review placement progress']),
      module('alumni', 'Alumni Outcomes', LineChart, 'Understand alumni career paths and use outcomes to guide students.', [['Business Analytics alumni', 'Product roles', 'Growing', 'Invite speaker'], ['Computer Science alumni', 'Software roles', 'Strong', 'Mentor network'], ['Marketing alumni', 'Brand roles', 'Stable', 'Collect stories']], ['Programme', 'Outcome group', 'Action'], [72, 86, 80], ['Invite alumni mentors', 'Collect salary ranges', 'Share success stories']),
      module('curriculum', 'Curriculum Suggestions', BookOpen, 'Review course changes that help students prepare for work.', universityRecords.courses, ['Course', 'Suggested change', 'Timeline'], [60, 79, 88], ['Add employer project', 'Refresh career readiness class', 'Review software practice tasks']),
      module('readiness', 'Student Readiness Dashboard', ChartNoAxesColumnIncreasing, 'See which students are ready for applications and who needs help.', universityRecords.students, ['Programme', 'Year', 'Readiness level'], [58, 73, 86], ['Support students without internships', 'Review portfolios', 'Share application checklist']),
      module('wallet', 'Learning Wallet', WalletCards, 'Keep certificates, skills, and achievements in one student record.', [['Data Analytics Certificate', 'Certificate', '480 students', 'Recognized'], ['Community project', 'Activity', '212 students', 'Add reflection'], ['Dean list', 'Achievement', '138 students', 'Published']], ['Credential', 'Type', 'Student group'], [67, 75, 83], ['Add new certificate', 'Review achievements', 'Share with employers']),
      module('risk', 'Risk Detection', ShieldCheck, 'Find students who may need academic, career, or placement support.', [['No internship yet', '214 students', 'High priority', 'Assign advisor'], ['Low profile completion', '388 students', 'Medium priority', 'Send reminder'], ['Few applications', '142 students', 'Medium priority', 'Career workshop']], ['Risk group', 'Priority', 'Support action'], [44, 69, 77], ['Assign advisors', 'Run application clinic', 'Check in after two weeks']),
      module('industry', 'Industry Collaboration', Handshake, 'Manage employer projects, talks, and collaboration opportunities.', universityRecords.partners, ['Partner', 'Project type', 'Owner'], [74, 88, 68], ['Confirm capstone brief', 'Schedule employer talk', 'Review partner feedback']),
      module('research', 'Research Marketplace', Sparkles, 'Connect research teams with companies and useful project opportunities.', [['Retail demand study', 'Business School', 'Partner wanted', 'Publish'], ['Campus energy dashboard', 'Built Environment', 'Industry pilot', 'Review'], ['Student wellbeing study', 'Social Science', 'Funding lead', 'Contact']], ['Research area', 'Partner need', 'Commercial path'], [57, 72, 84], ['Publish two research briefs', 'Invite company reviewers', 'Track project interest']),
      module('partnerships', 'Employer Partnerships', Building2, 'Build long-term employer relationships and placement channels.', universityRecords.partners, ['Employer', 'Relationship owner', 'Next meeting'], [81, 70, 76], ['Plan quarterly review', 'Share talent report', 'Add internship slots']),
    ],
  },
  admin: {
    name: 'Admin Workspace',
    welcome: 'Manage the full Career OS ecosystem across users, employers, universities, jobs, internships, content, and reports.',
    accent: '#111111',
    pages: [
      module('users', 'Manage Users', Users, 'Review account activity and support workspace access.', adminRecords.users, ['User group', 'Status', 'Action'], [82, 76, 88], ['Review new signups', 'Resolve access requests', 'Check workspace health']),
      module('universities', 'Manage Universities', GraduationCap, 'Maintain university profiles, programmes, and career centre contacts.', universityRecords.partners, ['University', 'Owner', 'Status'], [66, 78, 84], ['Approve new university', 'Update contacts', 'Review partnership notes']),
      module('employers', 'Manage Employers', Building2, 'Review employer profiles, hiring activity, and partnership quality.', employerRecords.jobs, ['Employer', 'Industry', 'Review note'], [73, 88, 69], ['Approve company update', 'Review hiring response time', 'Flag stale roles']),
      module('students', 'Manage Students', UserRoundCheck, 'Support student records, readiness, and application access.', universityRecords.students, ['Student group', 'Issue', 'Action'], [61, 82, 79], ['Review support queue', 'Check profile progress', 'Assign career advisor']),
      module('jobs', 'Manage Jobs', Briefcase, 'Keep role listings current, clear, and useful.', employerRecords.jobs, ['Role', 'Employer', 'Action'], [74, 67, 91], ['Review salary clarity', 'Remove closed roles', 'Feature strong listings']),
      module('internships', 'Manage Internships', ClipboardCheck, 'Oversee internship listings, placements, and employer capacity.', [['Analytics Intern', 'Talentbank', '32 applicants', 'Open'], ['Cloud Support Intern', 'Nusantara Cloud', '18 applicants', 'Open'], ['Research Intern', 'Apex Lab', '11 applicants', 'Review']], ['Internship', 'Employer', 'Deadline'], [70, 81, 64], ['Confirm open roles', 'Review placement capacity', 'Share with universities']),
      module('analytics', 'Manage Analytics', ChartNoAxesColumnIncreasing, 'Track platform activity and report meaningful progress.', adminRecords.activity, ['Metric', 'Period', 'Owner'], [88, 71, 93], ['Review weekly movement', 'Export partner update', 'Check slow areas']),
      module('content', 'Manage Content', FileText, 'Maintain career guides, opportunity pages, and help content.', adminRecords.content, ['Content type', 'Audience', 'Status'], [76, 80, 68], ['Refresh top guide', 'Review opportunity dates', 'Publish new checklist']),
      module('reports', 'Manage Reports', LineChart, 'Prepare reports for partners, leadership, and operations.', adminRecords.content, ['Report name', 'Audience', 'Due date'], [64, 79, 86], ['Prepare monthly summary', 'Send employer report', 'Review university pack']),
      module('trending-talent-management', 'Trending Talent Management', Star, 'Manage the public list of high-potential future employees.', TRENDING_TALENT.map((person) => [person.name, person.field, `${person.score}%`, person.rank <= 3 ? 'Featured' : 'Listed']), ['Full name', 'Field', 'Match score'], [96, 91, 87], ['Add new talent', 'Mark top profile as featured', 'Review profile highlights']),
    ],
  },
};
