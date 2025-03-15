"use client";

import { useState ,useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    useEffect(() => {
        const adminToken = localStorage.getItem("adminAuthToken");
        if (!adminToken) {
            router.push("/admin/login");
        }
    }, []);


    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword) {
            toast.error("Both fields are required!");
            return;
        }

        setLoading(true);

        try {
            const adminAuthToken = localStorage.getItem("adminAuthToken");

            if (!adminAuthToken) {
                throw new Error("Authentication failed! Please log in again.");
            }

            const response = await fetch("http://localhost:5001/admin-change-password", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${adminAuthToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: "admin", oldPassword, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to change password. Please try again.");
            }

            toast.success("Password changed successfully!");
            router.push('/admin/panel')
            setOldPassword("");
            setNewPassword("");
        } catch (error) {
            if (error.message.includes("Failed to fetch")) {
                toast.error("Server is unreachable. Please check your internet or backend.");
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />

            <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 flex items-center justify-center ">
                <div className="relative bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-96 border border-white/20">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">
                        Change Password
                    </h2>

                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Old Password"
                                className="w-full p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="password"
                                placeholder="New Password"
                                className="w-full p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-lg font-semibold tracking-wide uppercase transition-all hover:opacity-90 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Change Password"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
