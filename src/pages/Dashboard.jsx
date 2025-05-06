import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, CreditCard, Users, LineChart, Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getFeeds, removeAll } from "@/feedSlice";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const feeds = useSelector(getFeeds);
  const dispatch = useDispatch();

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
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const isAdmin = userData.role === "admin";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {!isAdmin && (
          <>
            <Card className="bg-gradient-to-r from-indigo-100 to-indigo-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Credits</CardTitle>
                <CreditCard className="w-5 h-5 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">{userData.credits}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-100 to-blue-200">
              <Button onClick={() => dispatch(removeAll())}>Delete all</Button>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  Saved Feeds
                </CardTitle>
                <Bookmark className="w-5 h-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">{feeds?.length}</p>
              </CardContent>
            </Card>
          </>
        )}

        {isAdmin && (
          <>
            <Card className="bg-gradient-to-r from-green-100 to-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Users</CardTitle>
                <Users className="w-5 h-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">{userData.totalUsers || 0}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-100 to-yellow-200">
              <Button>Delete all</Button>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  Feed Activity
                </CardTitle>
                <LineChart className="w-5 h-5 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">{feeds?.length} posts</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5" /> Recent Activity
          </h3>
          <Separator />
        </div>

        {userData.activities?.length > 0 ? (
          <ul className="space-y-2">
            {userData.activities.map((activity, index) => (
              <li
                key={index}
                className="bg-muted px-4 py-2 rounded-xl text-sm text-muted-foreground"
              >
                <span className="font-medium">{activity.action}</span>{" "}
                <span className="text-xs">
                  — {new Date(activity.date).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No recent activity found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
