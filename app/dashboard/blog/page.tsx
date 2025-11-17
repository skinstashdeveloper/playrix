"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit2, Trash2, Eye } from "lucide-react"
import Link from "next/link"

const INITIAL_BLOGS = [
  {
    id: 1,
    title: "How to Set Up IPTV on Your Android Device",
    category: "Tutorial",
    date: "November 15, 2024",
    status: "Published",
  },
  {
    id: 2,
    title: "Best IPTV Servers for 4K Streaming",
    category: "Server Guide",
    date: "November 10, 2024",
    status: "Published",
  },
]

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "Tutorial",
    content: "",
    excerpt: "",
    image: "",
  })

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({ title: "", category: "Tutorial", content: "", excerpt: "", image: "" })
    setShowForm(true)
  }

  const handleEdit = (blog: any) => {
    setEditingId(blog.id)
    setFormData({
      title: blog.title,
      category: blog.category,
      content: "",
      excerpt: "",
      image: "",
    })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in all required fields")
      return
    }

    if (editingId) {
      setBlogs(
        blogs.map((b) => (b.id === editingId ? { ...b, title: formData.title, category: formData.category } : b)),
      )
    } else {
      const newBlog = {
        id: Math.max(...blogs.map((b) => b.id), 0) + 1,
        title: formData.title,
        category: formData.category,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        status: "Published",
      }
      setBlogs([newBlog, ...blogs])
    }
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter((b) => b.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Blog Management</h2>
          <p className="text-muted-foreground">Create and manage your blog posts</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          New Post
        </button>
      </div>

      {/* Blog Form */}
      {showForm && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter blog title"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>General</option>
                  <option>Tutorial</option>
                  <option>Server Guide</option>
                  <option>Pricing</option>
                  <option>Support</option>
                  <option>Technology</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description of the blog post"
                rows={2}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog content here..."
                rows={8}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Save Post
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blog List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>{blogs.length} total posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{blog.title}</td>
                    <td className="py-4 px-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                        {blog.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{blog.date}</td>
                    <td className="py-4 px-4">
                      <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-medium">
                        {blog.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${blog.id}`}
                          className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => handleEdit(blog)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
