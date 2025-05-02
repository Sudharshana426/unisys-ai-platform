import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Award, Calendar, ExternalLink, FileText, Plus, Search, Star, Trophy } from "lucide-react";
import AddCertificationModal from "@/components/certifications/AddCertificationModal";
import ViewCertificateModal from "@/components/certifications/ViewCertificateModal";
import axios from 'axios';
import { toast } from "sonner";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  level?: 'beginner' | 'intermediate' | 'advanced';
  status: 'active' | 'expired' | 'pending';
}

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certification | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/certifications');
      setCertifications(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch certifications');
      toast.error('Failed to fetch certifications');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCertification = async (certification: Omit<Certification, 'id'>) => {
    try {
      const response = await axios.post('http://localhost:5000/api/certifications', certification);
      setCertifications([...certifications, response.data]);
      setIsAddModalOpen(false);
      toast.success('Certification added successfully!');
    } catch (err) {
      toast.error('Failed to add certification');
    }
  };

  const handleDeleteCertification = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/certifications/${id}`);
      setCertifications(certifications.filter(cert => cert.id !== id));
      toast.success('Certification deleted successfully');
    } catch (err) {
      toast.error('Failed to delete certification');
    }
  };

  const viewCertificate = (certificate: Certification) => {
    setSelectedCertificate(certificate);
    setIsViewModalOpen(true);
  };

  const filteredCertifications = certifications.filter(cert => 
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCertifications = filteredCertifications.filter(cert => cert.status === 'active');
  const expiredCertifications = filteredCertifications.filter(cert => cert.status === 'expired');
  const pendingCertifications = filteredCertifications.filter(cert => cert.status === 'pending');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Award className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-semibold">Error Loading Certifications</h3>
        <p className="mt-1 text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Certifications</h1>
          <p className="text-muted-foreground">Track and showcase your professional certifications</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search certifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active ({activeCertifications.length})</TabsTrigger>
          <TabsTrigger value="expired">Expired ({expiredCertifications.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCertifications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeCertifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCertifications.map((cert) => (
                <Card key={cert.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{cert.name}</CardTitle>
                        <CardDescription className="mt-1">{cert.issuer}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {cert.level?.charAt(0).toUpperCase() + cert.level?.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        Issued: {new Date(cert.issueDate).toLocaleDateString()}
                      </div>
                      {cert.expiryDate && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                        </div>
                      )}
                      {cert.credentialId && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FileText className="mr-2 h-4 w-4" />
                          ID: {cert.credentialId}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {cert.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => viewCertificate(cert)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    {cert.credentialUrl && (
                      <Button asChild className="flex-1">
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Verify
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No Active Certifications</h3>
              <p className="mt-1 text-muted-foreground">
                Add your first certification to get started.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {expiredCertifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expiredCertifications.map((cert) => (
                <Card key={cert.id} className="overflow-hidden">
                  {/* Similar card structure as active certifications */}
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No Expired Certifications</h3>
              <p className="mt-1 text-muted-foreground">
                Keep your certifications up to date!
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingCertifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingCertifications.map((cert) => (
                <Card key={cert.id} className="overflow-hidden">
                  {/* Similar card structure as active certifications */}
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No Pending Certifications</h3>
              <p className="mt-1 text-muted-foreground">
                Add certifications you're currently working towards.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AddCertificationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={async (formData) => {
          try {
            const response = await axios.post('http://localhost:5000/api/certifications', formData);
            setCertifications([...certifications, response.data]);
            setIsAddModalOpen(false);
            toast.success('Certification added successfully');
          } catch (err) {
            toast.error('Failed to add certification');
          }
        }}
      />

      <ViewCertificateModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        certificate={selectedCertificate ? {
          name: selectedCertificate.name,
          fileURL: selectedCertificate.credentialUrl || '',
          fileName: `${selectedCertificate.name}.pdf`
        } : null}
      />
    </div>
  );
};

export default Certifications;
