package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/google/uuid"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type UserHandler struct {
	userService *services.UserService
}

// dependence injection
// Constructor to inject UserService into handler
func NewUserHandler(userService *services.UserService) *UserHandler {
	return &UserHandler{
		userService: userService,
	}
}

// used when creating a user
type createUserRequest struct {
	Email     string `json:"email"`
	FullName  string `json:"full_name"`
	AvatarURL string `json:"avatar_url"`
	GoogleID  string `json:"google_id"`
}

type balanceRequest struct {
	Amount float64 `json:"amount"`
}

type updateUserRequest struct {
	FullName  string `json:"full_name"`
	AvatarURL string `json:"avatar_url"`
}

//Create user
//post /users

func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {

	//decoding the json request body
	//user send the data which is raw data json like  and then it is converted into the struct
	var req createUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	//validation
	if req.Email == "" || req.GoogleID == "" {
		http.Error(w, "email and google_id are required", http.StatusBadRequest)
		return
	}

	//service layer communication this is the brain
	//this is like inserting the data into the service layer and then into database
	user, err := h.userService.CreateUser(
		r.Context(),
		req.Email,
		req.FullName,
		req.AvatarURL,
		req.GoogleID,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//send response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(user); err != nil {
		//if encoding fails we send a 500 error
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

// get /users/{id}
func (h *UserHandler) GetUserByID(w http.ResponseWriter, r *http.Request) {
	//read id from url
	idParam := chi.URLParam(r, "id")

	//convert string to uuid
	userID, err := uuid.Parse(idParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusNotFound)
		return
	}

	//using service layer to fetch data
	user, err := h.userService.GetUserByID(r.Context(), userID)
	if err != nil {
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}

	//sending it back in the form of json to client
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(user); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h *UserHandler) GetUserByEmail(w http.ResponseWriter, r *http.Request) {

	defer r.Body.Close()

	email := chi.URLParam(r, "email")

	if email == "" {
		http.Error(w, "email is required", http.StatusBadRequest)
		return
	}

	user, err := h.userService.GetUserByEmail(r.Context(), email)
	if err != nil {
		http.Error(w, "user not found ", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-type", "application/json")
	if err := json.NewEncoder(w).Encode(user); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (h *UserHandler) GetUserByGoogleID(w http.ResponseWriter, r *http.Request) {

	defer r.Body.Close()

	googleID := chi.URLParam(r, "google_id")

	if googleID == "" {
		http.Error(w, "googleID is required", http.StatusBadRequest)
		return
	}

	user, err := h.userService.GetUserByGoogleID(r.Context(), googleID)
	if err != nil {
		http.Error(w, "user not found ", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-type", "application/json")
	if err := json.NewEncoder(w).Encode(user); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

// updating user profile
func (h *UserHandler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	idParam := chi.URLParam(r, "id")

	userID, err := uuid.Parse(idParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	var req updateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Fetch existing user first (important for partial updates)
	existing, err := h.userService.GetUserByID(r.Context(), userID)
	if err != nil {
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}

	// Apply only provided fields
	if req.FullName != "" {
		existing.FullName = req.FullName
	}
	if req.AvatarURL != "" {
		existing.AvatarURL = req.AvatarURL
	}

	updatedUser, err := h.userService.UpdateUser(r.Context(), existing)
	if err != nil {
		http.Error(w, "failed to update user", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	render.JSON(w, r, updatedUser)
}

func (h *UserHandler) IncrementFakeBalance(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	idParam := chi.URLParam(r, "id")

	userID, err := uuid.Parse(idParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	var req balanceRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if err := h.userService.IncrementFakeBalance(
		r.Context(),
		userID,
		req.Amount,
	); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]string{
		"status": "balance incremented successfully",
	})
}

func (h *UserHandler) DeductFakeBalance(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	idParam := chi.URLParam(r, "id")

	userID, err := uuid.Parse(idParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	var req balanceRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if err := h.userService.DeductFakeBalance(
		r.Context(),
		userID,
		req.Amount,
	); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]string{
		"status": "balance deducted successfully",
	})
}
