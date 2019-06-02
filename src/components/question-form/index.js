import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { FileInput } from '@8base/file-input';
import { toast } from 'react-toastify';

import 'react-tagsinput/react-tagsinput.css';
import './form.css';

const QUESTION_CREATE_MUTATION = gql`
  mutation QuestionCreate($data: QuestionCreateInput!) {
    questionCreate(data: $data) {
      id
    }
  }
`;

const QuestionForm = ({ closeModal, questionCreate }) => {
  const [questionForm, setQuestion] = useState({
    options: [],
    question: '',
    image: {},
    answer: '',
  });
  const inputProps = {
    placeholder: 'Add an option and press enter',
    className: 'question-input',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await questionCreate({ variables: { data: questionForm } });
    closeModal();
    toast('Your question has been created successfully');
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;

    setQuestion({
      ...questionForm,
      [name]: value,
    });
  };

  const handleTagsChange = (options) => {
    setQuestion({
      ...questionForm,
      options,
    });
  };

  const handleImageChange = (value) => {
    console.log(value);
    setQuestion({
      ...questionForm,
      image: { create: value },
    });
  };

  return (
    <form action="" id="question-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="question"
        placeholder="Enter your GOT related question...."
        onChange={handleInputChange}
        value={questionForm.question}
        className="question-input"
      />
      <TagsInput
        value={questionForm.options}
        onChange={handleTagsChange}
        maxTags={4}
        inputProps={inputProps}
      />
      <input
        type="text"
        placeholder="Add the answer to the question..."
        value={questionForm.answer}
        onChange={handleInputChange}
        className="question-input"
        name="answer"
      />
      <FileInput
        onChange={handleImageChange}
        value={questionForm.image}
        maxFiles={1}
        name="image"
      >
        {({ pick, value }) => (
          <div className="image-area">
            <button type="button" onClick={pick} className="image-upload">
              Choose File
            </button>
            <p style={{ whiteSpace: 'nowrap' }}>
              {value
                ? Array.isArray(value)
                  ? `${value.length} files selected`
                  : value.filename
                : 'No files selected'}
            </p>
          </div>
        )}
      </FileInput>

      <div className="submit-area">
        <button className="submit-button" type="submit">
          Create Question
        </button>
      </div>
    </form>
  );
};

export default graphql(QUESTION_CREATE_MUTATION, {
  name: 'questionCreate',
})(QuestionForm);
