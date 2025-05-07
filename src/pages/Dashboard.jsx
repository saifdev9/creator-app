import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeeds } from "@/feedSlice";
import { Activity, Bookmark, CreditCard, LineChart, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const savedFeeds = useSelector(getFeeds);
  const router = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("/user/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-4 text-center">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const isAdmin = userData.role === "admin";
  console.log(userData);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
      <h2 className="text-4xl font-extrabold text-indigo-700 tracking-wide">
        Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {!isAdmin && (
          <>
            {/* User: Credits */}
            <Card className="bg-gradient-to-r from-indigo-200 to-indigo-400 shadow-lg rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium text-white">
                  Credits
                </CardTitle>
                <CreditCard className="w-6 h-6 text-white" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">
                  {userData?.credits ?? 0}
                </p>
              </CardContent>
            </Card>

            {/* User: Saved Feeds */}
            <Card className="bg-gradient-to-r from-blue-200 to-blue-400 shadow-lg rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium text-white">
                  Saved Feeds
                </CardTitle>
                <Bookmark className="w-6 h-6 text-white" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">
                  {savedFeeds?.length ?? 0}
                </p>
              </CardContent>
              <CardFooter>
                {/* Button to navigate to Saved Feeds Page */}
                <Button
                  className="w-full"
                  onClick={() => router("/app/saved-feeds")} // Navigate to saved feeds page
                >
                  View Saved Feeds
                </Button>
              </CardFooter>
            </Card>
          </>
        )}

        {isAdmin && (
          <>
            {/* Admin: Total Users */}
            <Card className="bg-gradient-to-r from-green-200 to-green-400 shadow-lg rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium text-white">
                  Users
                </CardTitle>
                <Users className="w-6 h-6 text-white" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">
                  {userData?.totalUsers ?? 0}
                </p>
              </CardContent>
            </Card>

            {/* Admin: Feed Activity */}
            <Card className="bg-gradient-to-r from-yellow-200 to-yellow-400 shadow-lg rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium text-white">
                  Feed Activity
                </CardTitle>
                <LineChart className="w-6 h-6 text-white" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">
                  {savedFeeds?.length ?? 0} posts
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" className="w-full">
                  Delete all
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>

      {/* Recent Activity (Visible to All) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold flex items-center gap-3 text-indigo-700">
            <Activity className="w-6 h-6" /> Recent Activity
          </h3>
          <Separator className="border-indigo-500" />
        </div>

        {userData.activities?.length > 0 ? (
          <ul className="space-y-4">
            {userData.activities.map((activity, index) => (
              <li
                key={activity.id ?? index}
                className="bg-indigo-50 px-6 py-3 rounded-xl text-sm text-indigo-600 shadow-sm hover:bg-indigo-100 transition duration-200"
              >
                <span className="font-medium">{activity.action}</span>{" "}
                <span className="text-xs text-gray-500">
                  —{" "}
                  {new Date(activity.date).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent activity found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
