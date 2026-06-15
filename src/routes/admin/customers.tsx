import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Search, Users } from 'lucide-react'
import { listAllCustomers } from '../../server/functions/customers'
import { useState } from 'react'

export const Route = createFileRoute('/admin/customers')({
  component: AdminCustomers,
})

function AdminCustomers() {
  const [search, setSearch] = useState('')

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['admin-customers'],
    queryFn: () => listAllCustomers()
  })

  const filteredCustomers = customers.filter(c => {
    if (!search) return true
    const q = search.toLowerCase()
    const name = `${c.firstName} ${c.lastName}`.toLowerCase()
    return name.includes(q) || c.email.toLowerCase().includes(q)
  })

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Customers</h1>
          <p className="text-muted-foreground">Manage and track your customers.</p>
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-secondary/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          {isLoading ? (
            <div className="p-8 flex justify-center text-muted-foreground">Loading customers...</div>
          ) : filteredCustomers.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <Users className="w-12 h-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium">No customers found</h3>
              <p className="text-muted-foreground text-sm">There are no customers matching your search.</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-muted-foreground bg-secondary/30">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Orders</th>
                  <th className="px-6 py-4 font-medium">Joined date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {customer._count.orders}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
