import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
    Building2,
    Search,
    Plus,
    Mail,
    Phone,
    Globe,
    MapPin
} from 'lucide-react';

interface Company {
    id: string;
    name: string;
    description: string;
    website: string;
    email: string;
    phone: string;
    address: string;
}

export function Companies() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock data - replace with actual API call
        const mockCompanies: Company[] = [
            {
                id: '1',
                name: 'TechCorp Solutions',
                description: 'Leading technology solutions provider specializing in software development and consulting services.',
                website: 'https://techcorp.com',
                email: 'hr@techcorp.com',
                phone: '+1-555-0123',
                address: 'San Francisco, CA'
            },
            {
                id: '2',
                name: 'Global Finance Inc',
                description: 'International financial services company providing investment banking and wealth management solutions.',
                website: 'https://globalfinance.com',
                email: 'careers@globalfinance.com',
                phone: '+1-555-0124',
                address: 'New York, NY'
            }
        ];

        setTimeout(() => {
            setCompanies(mockCompanies);
            setIsLoading(false);
        }, 1000);
    }, []);

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Companies</h1>
                    <p className="text-muted-foreground">
                        Manage company partnerships and profiles
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Company
                </Button>
            </div>

            {/* Search and Stats */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                        {filteredCompanies.length} companies
                    </span>
                </div>
            </div>

            {/* Companies Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {filteredCompanies.map((company) => (
                    <Card key={company.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-xl">{company.name}</CardTitle>
                                    <Badge variant="secondary" className="mt-2">
                                        Partner Company
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground line-clamp-3">
                                {company.description}
                            </p>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="truncate">{company.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{company.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{company.address}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline truncate"
                                    >
                                        {company.website}
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button size="sm" variant="outline" className="flex-1">
                                    View Profile
                                </Button>
                                <Button size="sm" className="flex-1">
                                    View Jobs
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredCompanies.length === 0 && searchTerm && (
                <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No companies found</h3>
                    <p className="text-muted-foreground">
                        Try adjusting your search terms or add a new company.
                    </p>
                </div>
            )}
        </div>
    );
}