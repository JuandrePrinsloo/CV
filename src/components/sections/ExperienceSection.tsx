import { Briefcase, Calendar, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

const experiences = [
	{
		id: 1,
		role: "Senior Software Engineer",
		company: "Realm Digital",
		location: "Remote",
		period: "Jan 9th 2020 - Current (Remote)",
		description:
			"In my tenure of over five years at Realm Digital, I have made substantial contributions to various projects. This experience has allowed me to deepen my knowledge of coding practices and refine my skills. My hands-on involvement in these projects has given me the opportunity to develop practical solutions and innovate for a diverse range of technical challenges.",
		achievements: [
			"Contributed to multiple large-scale projects across web and mobile",
			"Improved deployment and monitoring practices",
			"Mentored team members and collaborated with cross-functional teams",
		],
		tech: ["TypeScript", "React", "Node.js", "WordPress (Headless)", "AWS"],
		projects: [
			{
				title: "Automated Statement Reconciliation and Payment Application (Netcash)",
				body:
					"Developed a sophisticated application for a prominent banking firm, seamlessly integrating it with Xero, a leading accounting software. Facilitated automatic statement reconciliation and mapping of transactions to specified accounts, streamlining financial processes. Enabled users to efficiently make and receive payments from clients and customers, enhancing transaction management.",
			},
			{
				title: "Multi-Tenant Website with Headless CMS (Sanlam)",
				body:
					"Spearheaded the development of a large-scale multi-tenant website catering to one of South Africa's major insurance companies. Implemented a headless CMS solution using Wordpress, empowering the client to create, update, and modify website content with utmost ease. Leveraged API integration to collect individual user data and dynamically generate personalized web pages for each customer.",
			},
			{
				title: "Digital Sign-Up Solution for Insurance Products (Sanlam)",
				body:
					"Contributed to the creation of a cutting-edge digital sign-up system for a range of insurance products. Implemented secure and legally binding digital signature capabilities for document signing, enhancing the customer onboarding process.",
			},
			{
				title: "POC Mobile Application for Logistics Company (Imperial Logistics)",
				body:
					"Led the development of a Proof of Concept (POC) mobile application for a major logistics company. Successfully integrated various existing applications into a unified platform, offering employees convenient access to notifications and work-related information. Enhanced organizational efficiency by providing a streamlined and cohesive mobile experience for employees.",
			},
			{
				title: "International Freelance Transcription Application (Way With Words)",
				body:
					"Developed an innovative international application catering to freelance transcribers and businesses worldwide. Enabled efficient transcription of video and audio files, supporting businesses in obtaining accurate and timely transcriptions for their content. Facilitated seamless collaboration between freelance transcribers and businesses, fostering a global transcription community.",
			},
		],
	},
	{
		id: 2,
		role: "Developer",
		company: "NML (New Media Labs)",
		location: "",
		period: "Jul - Dec 2019",
		description:
			"I worked as a developer on an internal project for a rewards system of the company (NML). The project name is \"HighFive\" and is written using C#, TypeScript and HTML5. I've worked on integrating the rewards system application with Microsoft Teams for pushing notifications on the company messaging channel. Another feature that I have worked on involved the integration with a third party API called TuYu for distributing monetary rewards within the company. I worked successfully in a junior team of 3 to complete these tasks. The project was fully unit tested and I worked on adding logging and monitoring for events and payments to Microsoft Application Insights.",
		achievements: ["Integrated with Microsoft Teams", "Added logging & monitoring", "Wrote unit tests"],
		tech: ["C#", "TypeScript", "HTML5", "Azure/Application Insights"],
	},
];

export default function ExperienceSection() {
	const [expandedId, setExpandedId] = useState<number | null>(null);

	return (
		<section className="min-h-[calc(100vh-140px)] p-6 md:p-12">
			<div className="max-w-4xl mx-auto">
				{/* Section Header */}
				<div className="flex items-center gap-3 mb-8 animate-fade-in-up">
					<Briefcase className="w-5 h-5 text-primary" />
					<h2 className="text-2xl font-mono font-semibold">Work Experience</h2>
					<span className="text-ide-comment text-sm font-mono">// Career timeline</span>
				</div>

				{/* Timeline */}
				<div className="relative">
					{/* Timeline Line */}
					<div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-border" />

					{/* Experience Items */}
					<div className="space-y-6">
						{experiences.map((exp, index) => (
							<div
								key={exp.id}
								className="relative pl-8 md:pl-12 animate-fade-in-up"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								{/* Timeline Dot */}
								<div className="absolute left-0 md:left-4 top-2 w-2 h-2 -translate-x-1/2 rounded-full bg-primary glow-primary" />

								{/* Content Card */}
								<div className="ide-panel">
									{/* Header */}
									<button
										onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
										className="w-full flex items-center justify-between px-4 py-3 bg-ide-gutter hover:bg-muted transition-colors text-left"
									>
										<div>
											<h3 className="font-mono font-medium text-foreground">{exp.role}</h3>
											<p className="text-sm text-primary">{exp.company}</p>
										</div>
										<ChevronDown
											className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
												expandedId === exp.id ? "rotate-180" : ""
											}`}
										/>
									</button>

									{/* Expandable Content */}
									<div
										className={`transition-all duration-300 ${
											// collapsed: hide overflow and set small max-height; expanded: allow scrolling inside and large max-height
											expandedId === exp.id
												? "max-h-[2000px] opacity-100 overflow-auto"
												: "max-h-0 opacity-0 overflow-hidden"
										}`}
										// hint to browser about the animated property
										style={{ willChange: "max-height" }}
									>
										<div className="p-4 border-t border-border">
											{/* Meta Info */}
											<div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
												<div className="flex items-center gap-1.5">
													<Calendar className="w-4 h-4" />
													<span className="font-mono">{exp.period}</span>
												</div>
												<div className="flex items-center gap-1.5">
													<MapPin className="w-4 h-4" />
													<span className="font-mono">{exp.location}</span>
												</div>
											</div>

											{/* Description */}
											<p className="text-muted-foreground text-sm mb-4">{exp.description}</p>

											{/* Achievements / Projects */}
											<div className="mb-4">
												{exp.projects ? (
													<div className="space-y-3">
														{exp.projects.map((p, idx) => (
															<div key={idx}>
																<h4 className="text-sm font-mono text-foreground mb-1 font-semibold">
																	{p.title}
																</h4>
																<p className="text-sm text-muted-foreground">{p.body}</p>
															</div>
														))}
													</div>
												) : (
													<>
														<h4 className="text-sm font-mono text-foreground mb-2">
															<span className="text-ide-keyword">const</span> achievements = [
														</h4>
														<ul className="space-y-1 pl-4">
															{exp.achievements.map((achievement, i) => (
																<li key={i} className="text-sm text-ide-string font-mono">
																	"{achievement}",
																</li>
															))}
														</ul>
														<span className="text-sm font-mono text-foreground">];</span>
													</>
												)}
											</div>

											{/* Tech Stack */}
											<div className="flex flex-wrap gap-2">
												{exp.tech.map((tech) => (
													<span
														key={tech}
														className="text-xs font-mono px-2 py-1 bg-secondary text-secondary-foreground rounded"
													>
														{tech}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
