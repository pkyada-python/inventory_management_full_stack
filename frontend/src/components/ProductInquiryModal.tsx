import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2, ShoppingCart, Info, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface ProductInquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    categoryName: string;
}

export const ProductInquiryModal = ({
    isOpen,
    onClose,
    productName,
    categoryName,
}: ProductInquiryModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        quantity: "1",
        message: `I'm interested in ${productName}. Please provide more information.`,
    });
    const [adminWhatsAppNumber, setAdminWhatsAppNumber] = useState("917487853898");

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch("/api/config/config");
                if (response.ok) {
                    const data = await response.json();
                    if (data.admin_whatsapp_number) {
                        setAdminWhatsAppNumber(data.admin_whatsapp_number);
                    }
                }
            } catch (error) {
                console.error("Error fetching config:", error);
            }
        };
        fetchConfig();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/inquiry/addinquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    product: productName,
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                toast.success("Inquiry sent successfully!");
                setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                    setFormData({
                        ...formData,
                        name: "",
                        email: "",
                        phone: "",
                        quantity: "1",
                        message: `I'm interested in ${productName}. Please provide more information.`,
                    });
                }, 3000);
            } else {
                const error = await response.json();
                toast.error(error.detail || "Failed to send inquiry");
            }
        } catch (error) {
            console.error("Inquiry submission error:", error);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl">
                <div className="bg-primary py-6 px-6 text-primary-foreground relative overflow-hidden">
                    <div className="relative z-10">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-serif font-bold flex items-center gap-2">
                                <ShoppingCart className="w-6 h-6" />
                                Product Inquiry
                            </DialogTitle>
                            <DialogDescription className="text-primary-foreground/80 text-base mt-2">
                                Request a quote for <span className="font-semibold text-white">{productName}</span>
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                </div>

                <div className="p-6 bg-card">
                    {isSuccess ? (
                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                <CheckCircle2 className="w-12 h-12 text-green-600 animate-in zoom-in duration-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">Thank You!</h3>
                            <p className="text-muted-foreground text-lg px-4">
                                Your inquiry for {productName} has been received. Our team will contact you shortly.
                            </p>
                            <div className="pt-4 flex flex-col gap-3 w-full px-8">
                                <Button
                                    variant="outline"
                                    className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold h-12"
                                    onClick={() => {
                                        const message = encodeURIComponent(
                                            `Hello Admin,\n\nI am *${formData.name}*.\nI just submitted an inquiry for *${productName}*.\n\n*Details:*\n📦 Product: ${productName}\n🔢 Quantity: ${formData.quantity}\n💬 Message: ${formData.message}\n\nI'd like to discuss further. Admin will reply me.`
                                        );
                                        window.open(`https://wa.me/${adminWhatsAppNumber}?text=${message}`, '_blank');
                                    }}
                                >
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Chat on WhatsApp
                                </Button>
                                <Button variant="ghost" onClick={onClose}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                                        Your Name
                                    </label>
                                    <Input
                                        required
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-background border-border"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">
                                        Phone Number
                                    </label>
                                    <Input
                                        required
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="bg-background border-border"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">
                                    Email Address
                                </label>
                                <Input
                                    required
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-background border-border"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                                    Quantity Required
                                </label>
                                <Input
                                    required
                                    placeholder="e.g. 10 Kg / 5 Liters"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    className="bg-background border-border"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">
                                    Your Message
                                </label>
                                <Textarea
                                    placeholder="Tell us about your requirements..."
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="bg-background border-border resize-none"
                                />
                            </div>

                            <div className="flex items-start gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-xs leading-relaxed border border-blue-100 mb-2">
                                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                                <p>
                                    By submitting this form, you request specialized information and pricing for this agricultural product.
                                </p>
                            </div>

                            <Button
                                type="submit"
                                variant="gold"
                                size="lg"
                                className="w-full font-bold h-12"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Submit Inquiry
                                    </>
                                )}
                            </Button>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
