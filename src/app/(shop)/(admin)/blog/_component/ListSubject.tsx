import React from "react";
import CreateTopic from "./CreateTopic";
import { getListTopicBlog } from "@/utils/actions/blog";
import Topic from "./Topic";

const ListSubject = async () => {
  let topicBlog = null;
  try {
    const response = await getListTopicBlog();
    topicBlog = response.payload;
  } catch (error) {
    return null;
  }
  return (
    <div className="space-y-4">
      <h1 className="font-medium text-lg">Danh sách chủ đề</h1>
      <div className="flex items-center justify-start gap-4">
        {topicBlog?.map((topic: any) => (
          <Topic topic={topic} key={topic.id} />
        ))}
      </div>
      <CreateTopic />
    </div>
  );
};

export default ListSubject;
