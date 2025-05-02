import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Calendar, Download, ExternalLink, File, Filter, Plus, Search } from "lucide-react";
import AddCertificationModal from "@/components/certifications/AddCertificationModal";
import ViewCertificateModal from "@/components/certifications/ViewCertificateModal";
import axios from 'axios';
import { toast } from "sonner";

const API_URL = 'http://localhost:5000/api';

const Certifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/certifications`);
      if (response.data) {
        setCertifications(response.data);
        setError(null);
      } else {
        setError('No data received from server');
      }
    } catch (err) {
      console.error("Error fetching certifications:", err);
      setError(err.response?.data?.message || 'Failed to fetch certifications');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCertification = async (newCertification) => {
    try {
      const formData = new FormData();
      Object.keys(newCertification).forEach(key => {
        if (key === 'skills') {
          formData.append(key, JSON.stringify(newCertification[key]));
        } else if (key === 'file' && newCertification[key]) {
          formData.append('certificate', newCertification[key]);
        } else {
          formData.append(key, newCertification[key]);
        }
      });

      const response = await axios.post(`${API_URL}/certifications`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.data) {
        setCertifications(prevCerts => [...prevCerts, response.data]);
        setIsAddModalOpen(false);
        toast.success("Certification added successfully!");
      } else {
        toast.error("Failed to add certification: No data received");
      }
    } catch (err) {
      console.error("Error adding certification:", err);
      toast.error(err.response?.data?.message || "Failed to add certification");
    }
  };

  const handleDeleteCertification = async (id) => {
    try {
      await axios.delete(`${API_URL}/certifications/${id}`);
      setCertifications(certifications.filter(cert => cert._id !== id));
    } catch (err) {
      setError('Failed to delete certification');
    }
  };

  const viewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setIsViewModalOpen(true);
  };

  const filteredCertifications = certifications.filter(cert => 
    cert.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cert.issuingOrganization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Certifications</h1>
          <p className="text-muted-foreground">Track and manage your professional certifications</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Certification
          </Button>
        </div>
      </div>
      
      <div className="relative flex-1 mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search certifications by name, provider, or skills..."
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Certifications</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCertifications.filter(cert => !cert.expiryDate?.includes("Expired")).map((certification) => (
              <Card key={certification._id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {certification.name}
                      </CardTitle>
                      <CardDescription>
                        {certification.issuingOrganization}
                      </CardDescription>
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {certification.issuingOrganization.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Issue Date</p>
                      <p className="font-medium">{certification.dateIssued}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{certification.expiryDate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Credential ID</p>
                      <p className="font-medium">{certification.credentialId}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {certification.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteCertification(certification._id)}
                  >
                    Delete
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => viewCertificate(certification)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Certificate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="expired" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCertifications.filter(cert => cert.expiryDate?.includes("Expired")).map((certification) => (
              <Card key={certification._id} className="border-dashed bg-muted/40">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 text-muted-foreground">
                        {certification.name}
                        <Badge variant="outline" className="text-red-500 border-red-500">Expired</Badge>
                      </CardTitle>
                      <CardDescription>
                        {certification.issuingOrganization}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Issue Date</p>
                      <p className="font-medium">{certification.dateIssued}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{certification.expiryDate}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteCertification(certification._id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {isAddModalOpen && (
        <AddCertificationModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddCertification}
        />
      )}

      {isViewModalOpen && selectedCertificate && (
        <ViewCertificateModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          certificate={selectedCertificate}
        />
      )}
    </div>
  );
};

export default Certifications;
