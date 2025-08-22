"use client"

import type React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Users } from "lucide-react"

const CareersPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">Join Our Team</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We're always looking for passionate individuals who share our vision of creating innovative gaming
                experiences. While we don't have any open positions right now, we'd love to hear from talented
                developers, artists, and designers.
              </p>
            </div>

            <Card className="mb-8 bg-card border-border">
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-playfair text-2xl text-foreground flex items-center justify-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  Current Openings
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <div className="bg-muted/50 rounded-lg p-8 mb-6">
                  <h3 className="font-playfair text-xl font-semibold text-foreground mb-3">No Open Vacancies</h3>
                  <p className="text-muted-foreground mb-4">
                    We currently don't have any open positions, but we're always interested in connecting with talented
                    individuals who are passionate about game development.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-playfair text-lg font-semibold text-foreground">
                    Interested in Future Opportunities?
                  </h4>
                  <p className="text-muted-foreground">
                    Send us your portfolio and let us know what makes you passionate about game development.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                      onClick={() => {
                        const contactSection = document.getElementById("contact")
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" })
                        } else {
                          window.location.href = "/#contact"
                        }
                      }}
                    >
                      <Mail className="w-4 h-4" />
                      Get In Touch
                    </Button>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Remote & On-site Opportunities</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-playfair text-xl text-foreground">What We Look For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Developers</h4>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Unity/Unreal Engine experience</li>
                      <li>• C# or C++ proficiency</li>
                      <li>• Game development portfolio</li>
                      <li>• Problem-solving mindset</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Artists & Designers</h4>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• 2D/3D art skills</li>
                      <li>• UI/UX design experience</li>
                      <li>• Creative portfolio</li>
                      <li>• Collaborative spirit</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default CareersPage
