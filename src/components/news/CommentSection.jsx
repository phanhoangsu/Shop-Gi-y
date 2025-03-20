import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";

const CommentSection = ({ comments = [], onAddComment, onAddReply }) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const handleSubmitReply = (commentId) => {
    if (replyText.trim()) {
      onAddReply(commentId, replyText);
      setReplyText("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Bình luận</h3>

      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Gửi
          </button>
        </div>
      </form>

      {comments.length === 0 ? (
        <p className="text-gray-500">Chưa có bình luận nào.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold dark:text-white">
                      {comment.author || "Ẩn danh"}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {comment.date}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {comment.text || comment.content}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <button
                      onClick={() => setReplyingTo(comment.id)}
                      className="text-sm text-gray-500 hover:text-red-500"
                    >
                      Trả lời
                    </button>
                    <div className="flex items-center gap-1">
                      <button className="text-gray-500 hover:text-red-500">
                        <FiHeart />
                      </button>
                      <span className="text-sm text-gray-500">
                        {comment.likes || 0}
                      </span>
                    </div>
                  </div>

                  {comment.replies && (
                    <div className="mt-4 ml-8 space-y-4">
                      {comment.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="bg-white dark:bg-gray-700 rounded-lg p-4"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="font-semibold dark:text-white">
                                  {reply.author || "Ẩn danh"}
                                </h5>
                                <span className="text-sm text-gray-500">
                                  {reply.date}
                                </span>
                              </div>
                              <p className="mt-1 text-gray-600 dark:text-gray-300">
                                {reply.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {replyingTo === comment.id && (
                    <div className="mt-4 ml-8">
                      <div className="flex gap-4">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Viết câu trả lời..."
                          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Gửi
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
