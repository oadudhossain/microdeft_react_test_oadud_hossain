import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Link href="/login"> Login </Link>
      <Link href="/register"> Register </Link>
      <Link href="/courses/add  "> Add Courses </Link>
    </div>
  );
}
