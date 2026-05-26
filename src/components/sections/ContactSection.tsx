import { Mail, Send, MessageSquare, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Web3Forms - Free, unlimited, instant email delivery
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSending, setIsSending] = useState(false);
    const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
    const [fallbackBody, setFallbackBody] = useState<string | null>(null);

    const openMailClient = async (data: { name: string; email: string; message: string }) => {
        const subject = encodeURIComponent(`Portfolio message from ${data.name || "Anonymous"}`);
        // Use CRLF for newlines to maximize compatibility with mail clients
        const bodyText = `Name: ${data.name}\r\nEmail: ${data.email}\r\n\r\n${data.message}`;
        const body = encodeURIComponent(bodyText);
        const mailto = `mailto:juandreprinsloo@gmail.com?subject=${subject}&body=${body}`;
        try {
            setFallbackBody(bodyText);
        } catch { /* ignore */ }
        try {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                await navigator.clipboard.writeText(bodyText).catch(() => {
                    /* ignore clipboard errors */
                });
            }
        } catch {
            // ignore
        }
        
        try {
            const a = document.createElement("a");
            a.href = mailto;
            a.style.display = "none";
            a.target = "_self"; // try to use same window to trigger native handlers
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                try { document.body.removeChild(a); } catch { /* ignore */ }
            }, 0);
        } catch {
            try { window.location.href = mailto; } catch { window.open(mailto, "_self"); }
        }
        try {
            setTimeout(() => {
                setFallbackNotice(
                    "Your email client was opened; your message was also copied to the clipboard. If the compose window didn't include the message, paste it (Ctrl/Cmd+V) into the new email."
                );
            }, 300);
        } catch { /* ignore */ }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSending) return;
        setIsSending(true);

        try {
            if (WEB3FORMS_ACCESS_KEY) {
                // Web3Forms API submission
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        access_key: WEB3FORMS_ACCESS_KEY,
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        subject: `Portfolio Contact from ${formData.name}`,
                        from_name: "Portfolio Contact Form",
                        // Optional: Add more metadata
                        replyto: formData.email,
                    }),
                });

                const result = await response.json();

                if (result.success) {
                    setFormData({ name: "", email: "", message: "" });
                    alert("Message sent successfully! I'll get back to you within 24 hours.");
                } else {
                    console.error("Web3Forms error:", result);
                    alert("Failed to send message. Opening email client as fallback.");
                    openMailClient(formData);
                }
            } else {
                // No API key configured, use mailto fallback
                openMailClient(formData);
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while sending your message. Opening email client as fallback.");
            openMailClient(formData);
        } finally {
            setIsSending(false);
        }
    };

    const handleCopyMessage = async () => {
        if (!fallbackBody) return;
        // Try to copy to clipboard and only show toast on success.
        try {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                await navigator.clipboard.writeText(fallbackBody);
                const t = toast({ title: "Message copied" });
                setTimeout(() => t.dismiss(), 2000);
            } else {
                // Fallback: select the textarea so the user can manually copy
                const textarea = document.querySelector('textarea[readOnly]') as HTMLTextAreaElement | null;
                if (textarea) {
                    textarea.select();
                    alert('Your browser does not support automatic clipboard copy. Text selected — press Ctrl/Cmd+C to copy.');
                }
            }
        } catch {
            // On failure, select the textarea and show a brief alert
            const textarea = document.querySelector('textarea[readOnly]') as HTMLTextAreaElement | null;
            if (textarea) {
                textarea.select();
                alert('Could not copy to clipboard automatically. Text selected — press Ctrl/Cmd+C to copy.');
            }
        }
    };

    return (
        <section className="min-h-[calc(100vh-140px)] p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-mono font-semibold">Contact</h2>
                    <span className="text-ide-comment text-sm font-mono">// Let's connect</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="animate-fade-in-up animate-delay-100">
                        <div className="ide-panel p-6 mb-6">
                            <div className="font-mono text-sm">
                                <span className="text-ide-comment">// Get in touch</span>
                                <br /><br />
                                <span className="text-ide-keyword">const</span>{" "}
                                <span className="text-foreground">contact</span>{" "}
                                <span className="text-ide-keyword">=</span>{" "}
                                <span className="text-primary">{"{"}</span>
                                <br />
                                <span className="pl-4 text-foreground">email</span>
                                <span className="text-muted-foreground">:</span>{" "}
                                <span className="text-ide-string">"juandreprinsloo@gmail.com"</span>
                                <span className="text-muted-foreground">,</span>
                                <br />
                                <span className="pl-4 text-foreground">response</span>
                                <span className="text-muted-foreground">:</span>{" "}
                                <span className="text-ide-string">"within 24 hours"</span>
                                <span className="text-muted-foreground">,</span>
                                <br />
                                <span className="pl-4 text-foreground">open_to</span>
                                <span className="text-muted-foreground">:</span>{" "}
                                <span className="text-primary">[</span>
                                <br />
                                <span className="pl-8 text-ide-string">"Job Opportunities"</span>
                                <span className="text-muted-foreground">,</span>
                                <br />
                                <span className="pl-8 text-ide-string">"Freelance Projects"</span>
                                <span className="text-muted-foreground">,</span>
                                <br />
                                <span className="pl-8 text-ide-string">"Collaborations"</span>
                                <br />
                                <span className="pl-4 text-primary">]</span>
                                <br />
                                <span className="text-primary">{"}"}</span>
                                <span className="text-muted-foreground">;</span>
                            </div>
                        </div>

                        {/* Social Links (open in new tab) */}
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={import.meta.env.VITE_GITHUB_URL || "https://github.com/JuandrePrinsloo"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-muted text-secondary-foreground rounded transition-all duration-200 hover:translate-y-[-2px]"
                            >
                                <Github className="w-4 h-4" />
                                <span className="font-mono text-sm">GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/juandre-prinsloo-135172182/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-muted text-secondary-foreground rounded transition-all duration-200 hover:translate-y-[-2px]"
                            >
                                <Linkedin className="w-4 h-4" />
                                <span className="font-mono text-sm">LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="animate-fade-in-up animate-delay-200">
                        <form onSubmit={handleSubmit} className="ide-panel">
                            {/* Form Header */}
                            <div className="px-4 py-3 border-b border-border bg-ide-gutter">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-primary" />
                                    <span className="font-mono text-sm">SendMessage.tsx</span>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-4 space-y-4">
                                <div>
                                    <label className="block font-mono text-sm text-muted-foreground mb-2">
                                        {"// Your name"}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-background border border-border rounded font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-sm text-muted-foreground mb-2">
                                        {"// Your email"}
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 bg-background border border-border rounded font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-sm text-muted-foreground mb-2">
                                        {"// Your message"}
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-2 bg-background border border-border rounded font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                        placeholder="Hello! I'd like to talk about..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded font-mono text-sm transition-all duration-200 glow-primary ${isSending ? 'bg-muted text-muted-foreground cursor-wait' : 'bg-primary text-primary-foreground hover:opacity-90 hover:translate-y-[-2px]'}`}
                                >
                                    <Send className="w-4 h-4" />
                                    {isSending ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Inline fallback notice: appears after mailto fallback and allows copy/dismiss */}
                {fallbackNotice && (
                    <div className="mb-4 ide-panel mt-8 p-4 bg-ide-gutter border-border">
                        <div className="flex flex-col gap-3">
                            <div className="text-sm font-mono text-foreground">{fallbackNotice}</div>
                            {fallbackBody && (
                                <textarea
                                    readOnly
                                    value={fallbackBody}
                                    className="w-full p-2 bg-background border border-border rounded font-mono text-sm text-foreground resize-none h-32"
                                />
                            )}
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    onClick={() => {
                                        // Re-open the mail client using the current form data
                                        openMailClient(formData);
                                    }}
                                    className="px-3 py-1.5 bg-primary text-primary-foreground rounded font-mono text-sm hover:opacity-90 transition"
                                >
                                    Open email
                                </button>
                                <button
                                    onClick={handleCopyMessage}
                                    className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded font-mono text-sm hover:opacity-90 transition"
                                >
                                    Copy message
                                </button>
                                <button
                                    onClick={() => setFallbackNotice(null)}
                                    className="px-3 py-1.5 bg-transparent border border-border text-muted-foreground rounded font-mono text-sm hover:opacity-90 transition"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ContactSection;
