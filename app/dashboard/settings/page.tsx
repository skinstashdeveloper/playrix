"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function SettingsPage() {
  const [step, setStep] = useState<"verify" | "update">("verify")
  const [currentPassword, setCurrentPassword] = useState("")
  const [username, setUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleVerify = () => {
    if (currentPassword) {
      setStep("update")
      setCurrentPassword("")
    }
  }

  const handleUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match")
      return
    }

    alert(`Updated:\nUsername: ${username}\nPassword: ${newPassword ? "Changed" : "Unchanged"}`)
    
    setStep("verify")
    setUsername("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold text-foreground">Settings</h2>
          <p className="text-lg text-muted-foreground">Manage your account credentials</p>
        </div>

        {step === "verify" ? (
          <Card className="bg-card border-border">
            <CardHeader className="space-y-2 pb-1">
              <CardTitle className="text-2xl">Verify Identity</CardTitle>
              <CardDescription className="text-base">Enter your current password to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="current-password" className="text-base">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="h-11"
                />
              </div>
              <Button onClick={handleVerify} className="w-full h-11 text-base">
                Verify & Continue
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-card border-border">
            <CardHeader className="space-y-2 pb-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle2 className="text-green-500" size={24} />
                Update Credentials
              </CardTitle>
              <CardDescription className="text-base">Change your username and password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="username" className="text-base">New Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter new username"
                  className="h-11"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new-password" className="text-base">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="h-11"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password" className="text-base">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="h-11"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1 h-11 text-base"
                  onClick={() => {
                    setStep("verify")
                    setUsername("")
                    setNewPassword("")
                    setConfirmPassword("")
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdate} className="flex-1 h-11 text-base">
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}