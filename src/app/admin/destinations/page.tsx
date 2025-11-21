'use client';
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
    { name: "Goa", bestTimeToVisit: "October to March", idealDuration: "4-5 Days", attractions: 1 },
    { name: "Kerala", bestTimeToVisit: "September to March", idealDuration: "6-7 Days", attractions: 0 },
    { name: "Rajasthan", bestTimeToVisit: "October to March", idealDuration: "7-8 Days", attractions: 0 },
    { name: "Himachal", bestTimeToVisit: "April to June, September to November", idealDuration: "5-6 Days", attractions: 0 },
    { name: "Ladakh", bestTimeToVisit: "June to September", idealDuration: "8-10 Days", attractions: 0 },
    { name: "Andaman", bestTimeToVisit: "October to May", idealDuration: "6-7 Days", attractions: 0 },
];

export default function DestinationsPage() {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Destination Management</h1>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    + Add New Destination
                </Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="p-4 text-sm font-semibold text-gray-500">NAME</th>
                            <th className="p-4 text-sm font-semibold text-gray-500">BEST TIME TO VISIT</th>
                            <th className="p-4 text-sm font-semibold text-gray-500">IDEAL DURATION</th>
                            <th className="p-4 text-sm font-semibold text-gray-500">ATTRACTIONS</th>
                            <th className="p-4 text-sm font-semibold text-gray-500">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {destinations.map((dest, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-800">{dest.name}</td>
                                <td className="p-4 text-gray-600">{dest.bestTimeToVisit}</td>
                                <td className="p-4 text-gray-600">{dest.idealDuration}</td>
                                <td className="p-4 text-gray-600">{dest.attractions}</td>
                                <td className="p-4">
                                    <div className="flex gap-4">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <Pencil size={18} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
