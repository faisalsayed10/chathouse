import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import toolbarConfig from "./toolbarConfig";
import hashtagConfig from "./hashtagConfig";
// import mentionConfig from "./mentionConfig";
import draftToHtml from "draftjs-to-html";
import { Box, IconButton, useToast } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { SEND_MESSAGE } from "../schema/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS_NAME } from "../schema/queries";

export default function ControlledEditor({ dummyRef, userName }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty()),
    onEditorStateChange = (editorState) => {
      setEditorState(editorState);
    };
  const toast = useToast();
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { data } = useQuery(GET_ALL_USERS_NAME);
  // eslint-disable-next-line
  const [suggestions, setSuggestions] = useState([]);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      if (rawContentState.blocks[0].text === "") {
        toast({
          title: `Cannot send the message`,
          description: `Message can't be empty.`,
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
      setEditorState(EditorState.createEmpty());
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
        placeholder="Type your message..."
        wrapperClassName="wrapper"
        editorClassName="editor"
        toolbarClassName="toolbar"
        onEditorStateChange={onEditorStateChange}
      />
      <IconButton
        onClick={handleSubmit}
        colorScheme="blue"
        icon={<ArrowForwardIcon />}
      />
    </Box>
  );
}
