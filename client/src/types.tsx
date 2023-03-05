export interface User {
  username: string;
  email: string;
  role: string;
  requests: Request[];
  reviews: Review[];
  socketID: string;
  registered: boolean;
}

export interface CallType {
  accepted: boolean;
  ended: boolean;
  isReceivingCall: boolean;
  userToCall?: string;
  from: string;
  name: string;
  signal: any;
}

export type Socket = any;

export type Request = {
  content: string;
  type: string;
  status: string;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
};

export interface Props {
  children: React.ReactNode;
}

export interface ContextType {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  onlineUsers: User[];
  stream?: MediaStream;
  call: CallType;
  setCall: React.Dispatch<React.SetStateAction<CallType>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  stroke: any[];
  setStroke: React.Dispatch<React.SetStateAction<any[]>>;
  incomingStroke: any[];
  setIncomingStroke: React.Dispatch<React.SetStateAction<any[]>>;
  request: any;
  setRequest: React.Dispatch<React.SetStateAction<any>>;
  localVideo: React.MutableRefObject<HTMLVideoElement | null>;
  remoteVideo: React.MutableRefObject<HTMLVideoElement | null>;
  peerRef: React.MutableRefObject<any | null>;
  socket: Socket;
  callUser: (userToCall: string) => void;
  answerCall: () => void;
  leaveCall: () => void;
  sendStroke: (stroke: any) => void;
  sendRequest: (request: any) => void;
  isAuthenticated: boolean;
  loginWithRedirect: () => void;
  logout: (logoutParams: any) => void;
  user: any;
  handleGetUser: (email: string) => void;
  handleCreateUser: (email: string, username: string, role: string) => void;
  handleUpdateUser: (email: string, username: string, role: string) => void;
  handleRequest: (request: any) => void;
  setStream: React.Dispatch<React.SetStateAction<MediaStream | undefined>>;
}

