import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Bookmark, BookmarkX, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "../axios";
import TextExpander from "@/UI/TextExpander";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, getFeeds, removeFeed } from "@/feedSlice";
import Filter from "@/UI/Filter";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const feeds = useSelector(getFeeds);
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("filterByMedia");
  const feedIds = feeds.map((feed) => feed.id);

  const filterFeeds = filterValue
    ? feed?.filter((fd) => fd.source === filterValue)
    : feed;

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/feed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeed(response.data);
      } catch (err) {
        toast.error(err.message || "Failed to load feed.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Curated Feed
          </motion.h1>

          <div className="flex gap-4">
            <Filter
              placeholder="Select a social media"
              label="Social media"
              paramsLabel="filterByMedia"
              items={[
                { label: "Reddit", value: "reddit" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "Twitter", value: "twitter" },
              ]}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-36 w-full rounded-xl" />
            ))}
          </div>
        ) : feed.length === 0 || filterFeeds.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">
            No posts available at the moment.
          </p>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {filterFeeds?.map((post, i) => {
              const isSaved = feedIds.includes(i);

              return (
                <motion.div
                  key={post.id || i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Card className="rounded-2xl border border-border bg-white dark:bg-muted/40 shadow-sm hover:shadow-lg transition duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base font-semibold">
                            {post.source || "Unknown Source"}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(post.postedAt).toDateString()}
                          </p>
                        </div>
                        {!isSaved ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              dispatch(addFeed({ ...post, id: i }))
                            }
                          >
                            <Bookmark className="w-5 h-5 text-muted-foreground" />
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => dispatch(removeFeed(post.id || i))}
                          >
                            <BookmarkX className="w-5 h-5 text-muted-foreground" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4 text-sm text-muted-foreground">
                      <TextExpander>{post.content}</TextExpander>
                      <Link
                        to={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 font-medium hover:underline text-sm"
                      >
                        View Post <ExternalLink className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Feed;
