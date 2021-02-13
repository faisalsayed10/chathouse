import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import toolbarConfig from "./toolbarConfig";
import hashtagConfig from "./hashtagConfig";
import mentionConfig from "./mentionConfig";
import draftToHtml from "draftjs-to-html";
import { Box, IconButton, useToast } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { SEND_MESSAGE } from "../schema/mutations";
import { useMutation } from "@apollo/client";

export default function ControlledEditor({ dummyRef, userName }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty()),
    onEditorStateChange = (editorState) => {
      setEditorState(editorState);
    };
  const toast = useToast();
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const rawContentState = convertToRaw(editorState.getCurrentContent());
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
      mt="4"
      as="form"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Editor
        toolbar={toolbarConfig}
        mention={mentionConfig}
        hashtag={hashtagConfig}
        editorState={editorState}
        placeholder="Type your message..."
        wrapperClassName="demo-wrapper"
        required={true}
        editorClassName="demo-editor"
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
