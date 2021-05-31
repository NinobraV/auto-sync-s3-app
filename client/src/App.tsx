import React, { useState } from "react";
import { Button, Form, Container, Row, Alert } from "react-bootstrap/";
import { axiosInstance } from "../src/providers/AxiosProviders";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [dirPath, setDirPath] = React.useState<string>("");
  const [accessKeyId, setAccessKeyId] = React.useState<string>("");
  const [secretAccessKey, setSecretAccessKey] = React.useState<string>("");
  const [region, setRegion] = React.useState<string>("");
  const [bucket, setBucket] = React.useState<string>("");
  const [, updateState] = React.useState<Object>();
  const [showAlert, setShowAlert] = React.useState<boolean>(false);

  const forceUpdate = React.useCallback(() => updateState({}), []);

  const createAWSInfo = () => {
    localStorage.setItem("dirPath", dirPath);
    localStorage.setItem("bucket", bucket);

    axiosInstance({
      method: "post",
      url: "/home/aws-info",
      data: {
        dirPath,
        awsCredential: {
          accessKeyId,
          secretAccessKey,
          region,
        },
        bucket,
      },
    }).then(() => {
      setShowAlert(true);
      const hiddenButton = document.querySelector("#hidden-button");
      const hiddenButtonElement = hiddenButton as HTMLButtonElement;

      hiddenButtonElement.click();
    });
  };

  const syncLocalFileToS3 = (dirPath: string | null, bucket: string | null) => {
    axiosInstance({
      method: "post",
      url: "/home/sync-dirpath-s3",
      data: {
        dirPath,
        bucket,
      },
    });
  };

  const syncS3FileToLocal = (dirPath: string | null, bucket: string | null) => {
    axiosInstance({
      method: "post",
      url: "/home/sync-s3-dirpath",
      data: {
        dirPath,
        bucket,
      },
    });
  };

  const syncAWSBucketData = () => {
    createAWSInfo();
  };

  React.useEffect(() => {
    const dirPath = localStorage.getItem("dirPath");
    const bucket = localStorage.getItem("bucket");
    if (dirPath && bucket) {
      syncLocalFileToS3(dirPath, bucket);
      syncS3FileToLocal(dirPath, bucket);
    }
  });
  return (
    <div className="background">
      <Alert show={showAlert} variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <p>
          Success ! Now your bucket is auto sync with your destination folder
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAlert(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
      <Container className="container">
        <Row className="justify-content-md-center">
          <Form className="justify-content-md-center">
            <Form.Label className="label">
              Provide your AWS Credential and Your destination folder to sync
              file
            </Form.Label>

            <Form.Group controlId="formAccessKey">
              <Form.Label>Access Key Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Access Key Id"
                onChange={(event: any) => {
                  setAccessKeyId(event.target.value);
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your access key with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formSecretAccessKey">
              <Form.Label>Secret Access Key</Form.Label>
              <Form.Control
                type="text"
                placeholder="Secret Access Key"
                onChange={(event: any) => {
                  setSecretAccessKey(event.target.value);
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your secret access key with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formSecretAccessKey">
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                placeholder="Region"
                onChange={(event: any) => {
                  setRegion(event.target.value);
                }}
              />
              <Form.Text className="text-muted">
                Region of your AWS account
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formSecretAccessKey">
              <Form.Label>Bucket</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bucket"
                onChange={(event: any) => {
                  setBucket(event.target.value);
                }}
              />
              <Form.Text className="text-muted">Your AWS Bucket Name</Form.Text>
            </Form.Group>

            <Form.Group controlId="formSecretAccessKey">
              <Form.Label>Directory path</Form.Label>
              <Form.Control
                type="text"
                placeholder="Directory path"
                onChange={(event: any) => {
                  setDirPath(event.target.value);
                }}
              />
              <Form.Text className="text-muted">
                Your local destination directory
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              onClick={() => {
                syncAWSBucketData();
              }}
            >
              Sync Data
            </Button>

            <Button
              id="hidden-button"
              variant="primary"
              type="button"
              hidden={true}
              onClick={forceUpdate}
            ></Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default App;
