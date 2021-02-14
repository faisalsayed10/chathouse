import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, getDefaultKeyBinding } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import toolbarConfig from "./toolbarConfig";
import hashtagConfig from "./hashtagConfig";
import draftToHtml from "draftjs-to-html";
import { Box, IconButton, useToast } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { SEND_MESSAGE } from "../schema/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS_NAME, GET_MESSAGES } from "../schema/queries";

export default function ControlledEditor({ dummyRef, userName }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty()),
    onEditorStateChange = (editorState) => {
      setEditorState(editorState);
    };
  const toast = useToast();
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    update(cache, { data: { sendMessage }}) {
      cache.modify({
        fields: {
          messages(existingMessages = []) {
            const newMessageRef = cache.writeQuery({
              data: sendMessage,
              query: GET_MESSAGES
            });
            return [...existingMessages, newMessageRef]
          }
        }
      })
    }
  });
  const { data } = useQuery(GET_ALL_USERS_NAME);
  // eslint-disable-next-line
  const [suggestions, setSuggestions] = useState([]);
  const newState = EditorState.createEmpty();

  const keyBindingFn = (event) => {
    if (event.keyCode === 13 && event.shiftKey) {
      handleSubmit().then(() =>
        setEditorState(EditorState.moveFocusToEnd(newState))
      );
    }
    return getDefaultKeyBinding(event);
  };

  useEffect(() => {
    if (data && data.users) {
      data.users.forEach((user) => {
        suggestions.push({
          text: user.userName,
          value: user.userName,
          url: `#${user.userName}`,
        });
      });
    }
    // eslint-disable-next-line
  }, [data]);

  const handleSubmit = async () => {
    try {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      if (rawContentState.blocks[0].text.trim() === "") {
        toast({
          title: `Cannot send the message`,
          description: `Message can't have a newline at the beginning or be empty.`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      const markup = draftToHtml(rawContentState, hashtagConfig);
      await sendMessage({
        variables: { author: userName, message: markup.toString() },
      });
      dummyRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      toast({
        title: `An error occured.`,
        description: `${err.message}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      as="form"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      my="4"
    >
      <Editor
        toolbar={toolbarConfig}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions,
        }}
        hashtag={hashtagConfig}
        editorState={editorState}
        placeholder={`Type your message | Enter - Newline | Shift+Enter - Send`}
        wrapperClassName="wrapper"
        editorClassName="editor"
        toolbarClassName="toolbar"
        onEditorStateChange={onEditorStateChange}
        handleReturn={() => {
          return;
        }}
        keyBindingFn={keyBindingFn}
      />
      <IconButton
        onClick={handleSubmit}
        colorScheme="blue"
        icon={<ArrowForwardIcon />}
      />
    </Box>
  );
}
