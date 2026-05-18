import testDirectoryData from "@/data/test-directory.json";
import DictionaryClient, { TestCategory } from "./DictionaryClient";

export default function DictionaryPage() {
  return <DictionaryClient categories={testDirectoryData as TestCategory[]} />;
}
