import React, { useState, useEffect } from "react";
import cx from "classnames";
import { gql } from "apollo-boost";
import {
  Button,
  Card,
  DatePicker,
  Input,
  Form,
  Steps,
  Layout
} from "element-react";
import map from "lodash/map";
import { Mutation, Query } from "react-apollo";

import Error from "../../Shared/Error";
import styles from "./CreateInvite.module.scss";

var images = require.context("../../../assets/images/", true);

const CREATE_INVITE_MUTATION = gql`
  mutation CreateInvite(
    $title: String!
    $desc: String
    $contactPhoneNumber: String
    $eventDatetime: DateTime
    $address: String
    $designPaper: String
  ) {
    createInvite(
      title: $title
      desc: $desc
      contactPhoneNumber: $contactPhoneNumber
      eventDatetime: $eventDatetime
      address: $address
      designPaper: $designPaper
    ) {
      invite {
        id
        title
        desc
        contactPhoneNumber
        eventDatetime
        address
        designPaper
      }
    }
  }
`;

const GET_DESIGNS_QUERY = gql`
  query GetDesigns {
    designs
  }
`;

const CreateInvite = ({ history, editMode = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDesign, setSelectedDesign] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(null);
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [locationAddress, setLocationAddress] = useState("");

  const submitForm = async (event, createInvite) => {
    event.preventDefault();
    const res = await createInvite();
    if (res.data.createInvite.invite.id) {
      history.push(`/invite/${res.data.createInvite.invite.id}`);
    }
  };

  return (
    <Mutation
      mutation={CREATE_INVITE_MUTATION}
      variables={{
        title,
        desc,
        eventDatetime: date,
        contactPhoneNumber,
        address: locationAddress,
        designPaper: selectedDesign
      }}
    >
      {(createInvite, { error, loading }) => {
        return (
          <div className={styles.mainGrid}>
            <Steps active={currentStep} className={styles.stepsComponent}>
              <Steps.Step
                title="Step 1"
                description="Browse designs"
                onClick={() => setCurrentStep(1)}
              ></Steps.Step>
              <Steps.Step
                title="Step 2"
                description="Personalize"
                onClick={() => setCurrentStep(2)}
              ></Steps.Step>
            </Steps>
            {currentStep === 1 && (
              <CreateInviteStep1
                setCurrentStep={setCurrentStep}
                setSelectedDesign={setSelectedDesign}
                history={history}
              />
            )}
            {currentStep === 2 && (
              <CreateInviteStep2
                setCurrentStep={setCurrentStep}
                title={title}
                desc={desc}
                date={date}
                contactPhoneNumber={contactPhoneNumber}
                locationAddress={locationAddress}
                setTitle={setTitle}
                setDesc={setDesc}
                setDate={setDate}
                setContactPhoneNumber={setContactPhoneNumber}
                setLocationAddress={setLocationAddress}
                submitForm={submitForm}
                createInvite={createInvite}
                error={error}
                loading={loading}
                history={history}
              />
            )}
          </div>
        );
      }}
    </Mutation>
  );
};

const CreateInviteStep1 = ({ history, setCurrentStep, setSelectedDesign }) => {
  const selectDesign = designImage => {
    setSelectedDesign(designImage);
    setCurrentStep(2);
  };

  return (
    <Query query={GET_DESIGNS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <div>loading ...</div>;
        if (error) return <div>error...</div>;

        const { designs } = data;
        return (
          <Layout.Row gutter="20" className={styles.layoutComponentStep1}>
            {map(designs, (designImage, index) => (
              <Layout.Col sm="24" className={styles.mainGrid} key={index}>
                <Card
                  className={styles.selectDesignCard}
                  bodyStyle={{ padding: 0 }}
                >
                  <div className={styles.designImageContainer}>
                    <img
                      src={images(`./${designImage}.jpg`)}
                      className={styles.designImage}
                    ></img>
                  </div>
                  <div
                    style={{ padding: 14 }}
                    className={styles.selectDesignButtonContainer}
                  >
                    <div>
                      <Button
                        type="text"
                        className={cx("button", styles.selectDesignButton)}
                        onClick={event => selectDesign(designImage)}
                      >
                        Select Design
                      </Button>
                    </div>
                  </div>
                </Card>
              </Layout.Col>
            ))}
          </Layout.Row>
        );
      }}
    </Query>
  );
};

const CreateInviteStep2 = ({ history, ...props }) => {
  const {
    title,
    desc,
    date,
    contactPhoneNumber,
    locationAddress,
    setTitle,
    setDesc,
    setDate,
    setContactPhoneNumber,
    setLocationAddress,
    submitForm,
    createInvite,
    error,
    loading
  } = props;

  return (
    <Layout.Row gutter="20" className={styles.layoutComponentStep2}>
      <Layout.Col sm="20" md="8" className={styles.mainGrid}>
        <Form
          className="en-US"
          model={{ title, desc, date, contactPhoneNumber }}
          labelWidth="120"
          labelPosition="top"
          onSubmit={event => submitForm(event, createInvite)}
        >
          <Form.Item label="Title of the event">
            <Input value={title} onChange={value => setTitle(value)}></Input>
          </Form.Item>
          <Form.Item label="Brief description of the event">
            <Input value={desc} onChange={value => setDesc(value)}></Input>
          </Form.Item>
          <Form.Item label="Select the date and time for your event">
            <DatePicker
              isShowTime={true}
              value={date}
              onChange={value => setDate(new Date(value))}
              placeholder="Pick a date and time"
              disabledDate={time => time.getTime() < Date.now() - 8.64e7}
            ></DatePicker>
          </Form.Item>
          <Form.Item label="Contact number(s)">
            <Input
              value={contactPhoneNumber}
              onChange={value => setContactPhoneNumber(value)}
            ></Input>
          </Form.Item>
          <Form.Item label="Venue Address">
            <Input
              value={locationAddress}
              onChange={value => setLocationAddress(value)}
            ></Input>
          </Form.Item>

          {error && <Error error={error} />}
          <Form.Item>
            <div className={styles.createInviteButtonDiv}>
              <Button nativeType="submit" disabled={loading || !title.trim()}>
                {loading ? "Creating invite..." : "Create Invite"}
              </Button>
              <Button onClick={() => history.push("/home")}>Cancel</Button>
            </div>
          </Form.Item>
        </Form>
      </Layout.Col>
    </Layout.Row>
  );
};

export default CreateInvite;
