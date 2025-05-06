import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeeds } from "@/feedSlice";
import Filter from "@/UI/Filter";
import { ExternalLink } from "lucide-react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SavedFeeds = () => {
  const savedFeeds = useSelector(getFeeds);
  const [searchParams] = useSearchParams();
  const filterValue = searchParams?.get("source");

  const filterFeeds = filterValue
    ? savedFeeds.filter((feed) => feed.source === filterValue)
    : savedFeeds;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-extrabold text-indigo-800 tracking-wide text-center">
          Saved Feeds
        </h2>

        <Filter
          items={[
            { label: "Reddit", value: "reddit" },
            { label: "Twitter", value: "twitter" },
            { label: "LinkedIn", value: "linkedin" },
          ]}
          placeholder="Select a media"
          paramsLabel="source"
          label="Social media"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filterFeeds.length > 0 ? (
          filterFeeds.map((feed) => (
            <Card
              key={feed.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <CardHeader className="mb-4">
                <CardTitle className="text-2xl font-semibold text-indigo-700">
                  {feed.source}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-">
                {/* Display Post Date */}
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-indigo-600">
                    Posted At:
                  </span>
                  <span>{new Date(feed.postedAt).toDateString()}</span>
                </div>

                {/* Display Content */}
                <div className="space-y-3">
                  <span className="font-semibold text-indigo-600">
                    Content:
                  </span>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {feed.content}
                  </p>
                </div>

                {/* Display Link with wrapping */}
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-indigo-600">Link:</span>
                  <div className="truncate overflow-hidden mt-2">
                    <a
                      href={feed.link}
                      target="_blank"
                      className="text-indigo-500 hover:text-indigo-700 flex items-center"
                    >
                      {feed.link}
                      <ExternalLink className="w-4 h-4 ml-2 text-indigo-500" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No saved feeds yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedFeeds;
