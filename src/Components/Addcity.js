// src/components/AddCity.jsx
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { Form, Button, Container, Row, Col, ProgressBar, Alert } from "react-bootstrap";

function parseArrayInput(value) {
  if (!value) return [];
  // split by comma, newlines or semicolon
  return value
    .split(/[,;\n]+/)
    .map(s => s.trim())
    .filter(Boolean);
}

export default function AddCity() {
  const [placeName, setPlaceName] = useState("");
  const [placeImagesFiles, setPlaceImagesFiles] = useState([]); // FileList -> array
  const [ridePrice, setRidePrice] = useState("");
  const [categoryText, setCategoryText] = useState(""); // comma-separated
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [highlightsText, setHighlightsText] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [popularity, setPopularity] = useState("");
  const [province, setProvince] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [createdAt, setCreatedAt] = useState(""); // datetime-local string
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0); // percent for upload
  const [message, setMessage] = useState(null);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setPlaceImagesFiles(files);
  };

  const uploadImagesAndGetUrls = async (files, placeNameForPath) => {
    const urls = [];
    if (!files || files.length === 0) return urls;

    let uploaded = 0;
    for (const file of files) {
      // create a unique path
      const path = `place_images/${placeNameForPath || "place"}_${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      // upload
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
      uploaded++;
      setProgress(Math.round((uploaded / files.length) * 100));
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);
    setProgress(0);

    try {
      // Basic validation
      if (!placeName.trim()) {
        setMessage({ type: "danger", text: "Place Name is required." });
        setSubmitting(false);
        return;
      }

      // Upload images first
      const imageUrls = await uploadImagesAndGetUrls(placeImagesFiles, placeName.replace(/\s+/g, "_"));

      // Build document
      const doc = {
        Place_Name: placeName,
        Place_Images: imageUrls,
        Rideprice: ridePrice ? String(ridePrice) : "",
        category: parseArrayInput(categoryText),
        description: description || "",
        duration: duration || "",
        highlights: parseArrayInput(highlightsText),
        maxPeople: maxPeople ? String(maxPeople) : "",
        popularity: popularity !== "" ? Number(popularity) : null,
        province: province || "",
        rating: rating !== "" ? Number(rating) : null,
        reviews: reviews !== "" ? Number(reviews) : null,
      };

      // CreatedAt: if user supplied a datetime-local string -> convert to Date
      if (createdAt) {
        // datetime-local gives "YYYY-MM-DDTHH:mm"
        doc.CreatedAt = new Date(createdAt);
      } else {
        doc.CreatedAt = new Date(); // current time
      }

      // Remove nulls if needed
      Object.keys(doc).forEach(k => {
        if (doc[k] === null) delete doc[k];
      });

      // Save to Firestore collection "All Cities"
      const colRef = collection(db, "All Cities");
      const res = await addDoc(colRef, doc);

      setMessage({ type: "success", text: `Saved successfully (id: ${res.id})` });
      setProgress(100);

      // Reset form (optional)
      setPlaceName("");
      setPlaceImagesFiles([]);
      setRidePrice("");
      setCategoryText("");
      setDescription("");
      setDuration("");
      setHighlightsText("");
      setMaxPeople("");
      setPopularity("");
      setProvince("");
      setRating("");
      setReviews("");
      setCreatedAt("");
    } catch (err) {
      console.error("Error saving city:", err);
      setMessage({ type: "danger", text: "Error saving: " + (err.message || err) });
    } finally {
      setSubmitting(false);
      // small delay to show 100% then clear
      setTimeout(() => setProgress(0), 800);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h3 className="mb-4">Add City — Save to <code>All Cities</code></h3>

          {message && <Alert variant={message.type}>{message.text}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="placeName">
              <Form.Label>Place Name</Form.Label>
              <Form.Control
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                placeholder="e.g., Gujrat"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="placeImages">
              <Form.Label>Place Images (select multiple)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesChange}
              />
              <Form.Text className="text-muted">
                Images will be uploaded to Firebase Storage and their URLs saved.
                {placeImagesFiles.length > 0 && (
                  <div className="mt-2">
                    <strong>Selected:</strong> {placeImagesFiles.map(f => f.name).join(", ")}
                  </div>
                )}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="ridePrice">
              <Form.Label>Rideprice</Form.Label>
              <Form.Control
                value={ridePrice}
                onChange={(e) => setRidePrice(e.target.value)}
                placeholder="7000"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="maxPeople">
                  <Form.Label>Max People</Form.Label>
                  <Form.Control
                    value={maxPeople}
                    onChange={(e) => setMaxPeople(e.target.value)}
                    placeholder="7"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="province">
                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="Punjab, PK"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category (comma separated)</Form.Label>
              <Form.Control
                value={categoryText}
                onChange={(e) => setCategoryText(e.target.value)}
                placeholder="Solo, Family"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="duration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="customized or 2 days"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="highlights">
              <Form.Label>Highlights (comma or newline separated)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                placeholder="Faisal Mosque, Pakistan Monument, +2 more"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="This is Desc of Gujrat."
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="popularity">
                  <Form.Label>Popularity (number)</Form.Label>
                  <Form.Control
                    type="number"
                    value={popularity}
                    onChange={(e) => setPopularity(e.target.value)}
                    placeholder="93"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="4.6"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="reviews">
                  <Form.Label>Reviews (count)</Form.Label>
                  <Form.Control
                    type="number"
                    value={reviews}
                    onChange={(e) => setReviews(e.target.value)}
                    placeholder="45"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="createdAt">
              <Form.Label>CreatedAt (optional)</Form.Label>
              <Form.Control
                type="datetime-local"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
              />
              <Form.Text className="text-muted">If left blank, current date/time will be used.</Form.Text>
            </Form.Group>

            {progress > 0 && <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />}

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Submit"}
              </Button>
              <Button variant="secondary" type="button" onClick={() => {
                // reset
                setPlaceName(""); setPlaceImagesFiles([]); setRidePrice(""); setCategoryText("");
                setDescription(""); setDuration(""); setHighlightsText(""); setMaxPeople(""); setPopularity("");
                setProvince(""); setRating(""); setReviews(""); setCreatedAt(""); setMessage(null); setProgress(0);
              }} disabled={submitting}>
                Reset
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
