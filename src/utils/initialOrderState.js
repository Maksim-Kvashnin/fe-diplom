export const initialOrderState = {
  departure_person_count: {
    adult: null,
    child: null,
    baby: null,
  },
  arrival_person_count: {
    adult: null,
    child: null,
    baby: null,
  },
  departure_service: {
    first: null,
    second: null,
    third: null,
    fourth: null,
  },
  arrival_service: {
    first: null,
    second: null,
    third: null,
    fourth: null,
  },
  user: {
    first_name: null,
    last_name: null,
    patronymic: null,
    phone: null,
    email: null,
    payment_method: null,
  },
  departure: {
    route_direction_id: null,
    seats: [
      {
        coach_id: null,
        seat_number: null,
        is_child: null,
        include_children_seat: null,
        person_info: {
          is_adult: null,
          first_name: null,
          last_name: null,
          patronymic: null,
          gender: null,
          birthday: null,
          document_type: null,
          document_data: null
        },
      },
    ],
  },
  arrival: {
    route_direction_id: null,
    seats: [
      {
        coach_id: null,
        seat_number: null,
        is_child: null,
        include_children_seat: null,
        person_info: {
          is_adult: null,
          first_name: null,
          last_name: null,
          patronymic: null,
          gender: null,
          birthday: null,
          document_type: null,
          document_data: null
        },
      },
    ],
  },
};