import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import handlePurchaseCourse from "../../services/purchaseCourse";
import fetchCourse from "../../services/fetchCourse";
import { CourseInterface } from "../../interfaces/courseInterface";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import "./checkoutPurchase.css";

type RouteParams = {
  id: string;
};

const CheckoutPurchase: React.FC = () => {
  const [purchaseStatus, setPurchaseStatus] = useState<string | null>(null);
  const { id } = useParams<RouteParams>();
  const [course, setCourse] = useState<CourseInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const courseData = await fetchCourse(id!);
        setCourse(courseData);
      } catch (err) {
        setError("Failed to fetch course!");
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handlePurchase = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Authentication token is missing!");
      }

      if (!id) {
        throw new Error("Course ID is missing!");
      }

      const responseData = await handlePurchaseCourse(id, token);

      if (responseData && responseData.accessToken) {
        sessionStorage.setItem("accessToken", responseData.accessToken);
        const successMessage =
          "Course purchased successfully and was added to 'My courses'!";
        setPurchaseStatus(successMessage);
        toast.success(successMessage);
      }
    } catch (error: any) {
      let errorMessage = "Something went wrong!";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setPurchaseStatus(errorMessage);
      toast.error(errorMessage);
      console.log(purchaseStatus);
    }
  };
  return (
    <>
      <div className="purchase-container">
        <Row>
          <Col md={4}>
            <div className="purchase-card-container">
              <Card.Body>
                <Link
                  to={`/courses/${course?._id}`}
                  className="purchase-link"
                  key={course?._id}
                >
                  <Card.Img
                    variant="top"
                    src={course?.course_picture}
                    className="purchase-image"
                  />
                </Link>
                <Card.Text className="purchase-title">
                  {course?.course_name}
                </Card.Text>
                <Card.Text className="purchase-message">
                  Purchase now for full access!
                </Card.Text>
                <Card.Text className="purchase-price">
                  Price: {course?.course_price} USD
                </Card.Text>
              </Card.Body>
            </div>
          </Col>
          <Col md={6}>
            <div className="form-container">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label as="legend">Payment Methods</Form.Label>
                  <div className="custom-radio">
                    <Form.Check
                      type="radio"
                      label="Debit or Credit Card"
                      name="paymentMethod"
                      id="paymentMethod1"
                      checked
                      disabled
                      className="Deb-label"
                    />
                    <Form.Check
                      type="radio"
                      label="PayPal"
                      name="paymentMethod"
                      id="paymentMethod2"
                      disabled
                      className="Pay-label"
                    />
                  </div>
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formGridFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="John" disabled />
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formGridLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Doe" disabled />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGridCardNumber">
                  <Form.Label>Credit card number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    disabled
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formGridCVC">
                    <Form.Label>CVC</Form.Label>
                    <Form.Control type="text" placeholder="123" disabled />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId="formGridExpiration">
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control type="text" placeholder="24/24" disabled />
                  </Form.Group>
                </Row>
              </Form>
              <Button
                variant="success"
                className="w-100"
                onClick={handlePurchase}
              >
                Submit Payment
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CheckoutPurchase;
