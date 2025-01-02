'use client';
import Container from "../components/Container";
import Heading from "../components/Heading";
import PostCard from "./PostCard";
import { SafePost } from "../types";

interface PostsProps {
  posts: SafePost[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <Container>
      <Heading
        title="Publicaciones"
        subtitle="Explora las publicaciones hechas especialmente para ti"
      />
      <div
        className="
          mt-10
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {posts.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </div>
    </Container>
  );
};

export default Posts;
