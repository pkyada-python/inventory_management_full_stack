import { AdminLayout } from '@/components/admin/AdminLayout';
import { useData } from '@/contexts/DataContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, ShoppingCart, MessageSquare, Calendar } from 'lucide-react';

export default function InquiriesPage() {
    const { inquiries } = useData();

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Product Inquiries</h1>
                </div>

                <div className="border rounded-lg overflow-hidden bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Product & Order</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inquiries.length > 0 ? (
                                inquiries.map((inquiry) => (
                                    <TableRow key={inquiry.id} className="hover:bg-muted/50 transition-colors">
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold text-foreground">{inquiry.name}</span>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Mail className="h-3 w-3" />
                                                    {inquiry.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Phone className="h-3 w-3" />
                                                    {inquiry.phone}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 font-medium">
                                                    <ShoppingCart className="h-4 w-4 text-primary" />
                                                    {inquiry.product}
                                                </div>
                                                <div className="flex gap-3 text-xs">
                                                    <Badge variant="outline" className="font-normal">
                                                        Qty: {inquiry.quantity}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-xs">
                                            <div className="flex items-start gap-2">
                                                <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                                                <p className="text-sm text-muted-foreground line-clamp-2 italic">
                                                    "{inquiry.message}"
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">
                                                New Inquiry
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                {inquiry.created_at ? new Date(inquiry.created_at).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                                                onClick={() => {
                                                    const text = encodeURIComponent(`Hello ${inquiry.name}, I am replying to your inquiry for ${inquiry.product}.`);
                                                    const phone = inquiry.phone.startsWith('91') ? inquiry.phone : `91${inquiry.phone}`;
                                                    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
                                                }}
                                            >
                                                <MessageSquare className="h-4 w-4 mr-1" />
                                                Reply
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground text-lg">
                                        No inquiries found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminLayout>
    );
}
