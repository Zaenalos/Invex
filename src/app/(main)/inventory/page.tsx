"use client";

import { useState } from "react";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/Table";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Widget A",
    sku: "WDG-001",
    category: "Electronics",
    quantity: 150,
    minStock: 20,
    price: 29.99,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Widget B",
    sku: "WDG-002",
    category: "Electronics",
    quantity: 8,
    minStock: 15,
    price: 45.99,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Component X",
    sku: "CMP-001",
    category: "Parts",
    quantity: 0,
    minStock: 10,
    price: 12.5,
    status: "Out of Stock",
  },
];

export default function Inventory() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(mockInventory.map((item) => item.category)))];

  const filteredInventory = mockInventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500/20 text-green-400";
      case "Low Stock":
        return "bg-yellow-500/20 text-yellow-400";
      case "Out of Stock":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
          <p className="mt-2 text-gray-400">Track and manage your inventory items</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>Add New Item</Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-700/60 bg-gray-800/70 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-gray-700/60 bg-gray-800/70 px-4 py-2 text-sm text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Inventory Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Min Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.minStock}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Item Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Inventory Item"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">Product Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-700/60 bg-gray-800/70 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">SKU</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-700/60 bg-gray-800/70 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
                placeholder="Enter SKU"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">Category</label>
              <select className="w-full rounded-lg border border-gray-700/60 bg-gray-800/70 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none">
                <option>Electronics</option>
                <option>Parts</option>
                <option>Accessories</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">Quantity</label>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-700/60 bg-gray-800/70 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">Min Stock</label>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-700/60 bg-gray-800/70 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">Price</label>
            <input
              type="number"
              step="0.01"
              className="w-full rounded-lg border border-gray-700/60 bg-gray-800/70 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
              placeholder="0.00"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
