import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import { useSession } from "next-auth/react";
import Rightbar from "./layout/Rightbar";
import MessageLayout from "./messages/message-container/messageLayout";
import SelectUser from "./messages/selectuser/selectuser";
import SingleMessage from "./messages/single-message/single-message";
import messageActions from "@/libs/actions/single-message-actions";
import { useSingleMessageActionDispatcher } from "@/hooks/use-singlemessage-dispatcher";
import SingleMessageActions from "@/libs/actions/single-message-actions";
import { useSocket } from "@/providers/socketProvider";
import { NotificationContext } from "@/providers/notificationProvider";
import notificationActions from "@/libs/actions/notificationActions";
import { useMessage } from "@/providers/messageProvider";
import { useModal } from "@/providers/modalProvider";
const Layout = ({ children, currentRoute, messageBox, user, messageId }) => {
  const { data: session } = useSession();
  const [send, setSend] = useState(false);
  const[isModal,setIsModal] = useModal();
  const socket = useSocket();
 
  const [state, dispatch] = useMessage();
  console.log("state on Layout", state);
  const [notifyState, dispatchNotify] = useContext(NotificationContext);


  useEffect(() => {
    
      dispatchNotify(notificationActions.DELETE_NOTIFICATIONS, {
        sessionId: session?.id,
        userId: user?._id,
      });
    
  }, []);

  useEffect(() => {
    if (messageId)
      dispatch(SingleMessageActions.GET_SINGLE_MESSAGE, { messageId });
  }, [user,messageId]);

  useEffect(() => {
    console.log("useEffect ran of Layout.jsx file", messageId);
    if (messageId) {
      socket.emit("join_chat", messageId);
    }

    console.log("state on layout", state);

    return () => {
      if (messageId) {
        socket.emit("leave_chat", messageId);
      }
    };
  }, [messageId, socket]);

  useEffect(() => {
    let messageReceived = false,
      notificationReceived = false,
      receiverend = false;
    const handleMessageReceived = async (newMessage, messageId, roomLength) => {
      messageReceived = true;
      if (session.id === newMessage.receiverId) {
        receiverend = true;
      }
      await dispatch(SingleMessageActions.UPDATE_MESSAGE_HISTORY, {
        newMessage,
        messageId,
        session,
        userSelected: false,
      });
      socket.emit("messageSeen", { messageId });
    };

    const handleNotificationReceived = async (newMessage, messageId) => {
      if (!messageReceived) {
        notificationReceived = true;
        await dispatchNotify(notificationActions.GIVE_NOTIFICATIONS, {
          senderId: newMessage.senderId,
          receiverId: newMessage.receiverId,
        });
      }
    };

    const handleSeen = async (messageId) => {
      console.log("messageId on handleSeen", messageId);
      const res = await fetch(`api/messages/${messageId}`);

      const data = await res.json();
      console.log("data on handleSeen", data);
      if (data.lastMessage?.seen === "true")
        await dispatch(SingleMessageActions.GET_SINGLE_MESSAGE, { messageId });
    };

    socket?.on("message received", handleMessageReceived);
    socket?.on("notification received", handleNotificationReceived);
    socket?.on("message seen", handleSeen);

    return () => {
      socket?.off("message received", handleMessageReceived);
      socket?.off("notification received", handleNotificationReceived);
      socket?.off("message seen", handleSeen);
    };
  }, [socket, dispatch, dispatchNotify, messageId]);

  const [text, setText] = useState("");

  const onTextChange = (e) => {
    setText(e.target.value);
  };
  const handleClick = async () => {
    setSend(true);
    await dispatch(SingleMessageActions.SEND_MESSAGE, {
      messageId,
      senderId: session.id,
      receiverId: user._id,
      text: text,
    });

    console.log(
      "after sending message current state",
      state,
      state.message._id
    );
    socket.emit(
      "new_message",
      {
        senderId: session.id,
        receiverId: user._id,
        text: text,
        id: state.message._id,
      },
      messageId
    );

    socket.emit(
      "notification",
      {
        senderId: session.id,
        receiverId: user._id,
        text: text,
        id: state.message._id,
      },
      messageId
    );

    setText("");
  };

  return (
    <>
      {session ? (
        <div className={isModal?'modal':'mainScreen'}>
          <div className="grid-container">
            <div className="left-sidebar">
              <Sidebar />
            </div>
            <div className="main-content">{children}</div>

            <div className={user ? "" : "right-sidebar"}>
              <div
                className={
                  currentRoute === "Messages" && !messageBox
                    ? "right-sidebar-content-message"
                    : "right-sidebar-content"
                }
              >
                {currentRoute === "Messages" ? (
                  !messageBox ? (
                    <SelectUser />
                  ) : (
                    <MessageLayout
                      user={user}
                      messageId={messageId}
                      onChange={onTextChange}
                      handleClick={handleClick}
                      text={text}
                    >
                      <SingleMessage />
                    </MessageLayout>
                  )
                ) : (
                  <Rightbar />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Layout;
