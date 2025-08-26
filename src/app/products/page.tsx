"use client";

export default function Products() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <p className="mt-2 text-gray-400">Manage your product catalog</p>
      </div>
      {/* Product management content will be implemented here */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-gray-300">Coming Soon</h3>
        <p className="mt-2 text-gray-400">
          Product management features are currently under development.
        </p>
      </div>
    </div>
  );
}
