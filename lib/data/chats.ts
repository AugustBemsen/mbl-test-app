export type Chat = {
  name: string;
  message: string;
  time: string;
  unreadCount: number;
};

const chats: Chat[] = [
  {
    name: "Alice Johnson",
    message: "Hey, how are you?",
    time: "10:30 AM",
    unreadCount: 3,
  },
  {
    name: "Bob Smith",
    message: "Let's catch up tomorrow.",
    time: "9:15 AM",
    unreadCount: 1,
  },
  {
    name: "Charlie Brown",
    message: "Did you complete the assignment?",
    time: "8:45 AM",
    unreadCount: 0,
  },
  {
    name: "David Williams",
    message: "Meeting at 2 PM.",
    time: "8:00 AM",
    unreadCount: 2,
  },
  {
    name: "Eva Green",
    message: "Happy Birthday!",
    time: "Yesterday",
    unreadCount: 0,
  },
];

export default chats;
