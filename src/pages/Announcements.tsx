import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAppStore } from '@/store'
import { announcementsAPI } from '@/services/api'
import { useToast } from '@/hooks/use-toast'

export function Announcements() {
  const { announcements, setAnnouncements, isLoadingAnnouncements, setLoadingAnnouncements } = useAppStore()
  const { toast } = useToast()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoadingAnnouncements(true)
      const data = await announcementsAPI.getAll()
      setAnnouncements(data)
    } catch (error) {
      console.error('Failed to fetch announcements:', error)
      toast({
        title: "Error",
        description: "Failed to load announcements",
        variant: "destructive",
      })
    } finally {
      setLoadingAnnouncements(false)
    }
  }

  const handleDeleteAnnouncement = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await announcementsAPI.delete(id)
        toast({
          title: "Success",
          description: "Announcement deleted successfully",
        })
        fetchAnnouncements()
      } catch (error) {
        console.error('Failed to delete announcement:', error)
        toast({
          title: "Error",
          description: "Failed to delete announcement",
          variant: "destructive",
        })
      }
    }
  }

  const getTargetAudienceLabel = (announcement: any) => {
    switch (announcement.targetAudience) {
      case 'ALL':
        return 'All Students'
      case 'BRANCH':
        return `${announcement.targetBranch} Branch`
      case 'BATCH':
        return `Year ${announcement.targetBatch} Students`
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">
            Create and manage announcements for students
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <p className="text-muted-foreground">Announcement creation form will be implemented here.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingAnnouncements ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-muted-foreground">Loading announcements...</p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Target Audience</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell className="font-medium">{announcement.title}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">
                        {announcement.content}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTargetAudienceLabel(announcement)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(announcement.publishedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
