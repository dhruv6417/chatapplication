import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack spacing={3}>
      {[...Array(12)].map((_, index) => (
        <Skeleton key={index} height="45px" borderRadius="md" />
      ))}
    </Stack>
  );
};

export default ChatLoading;
