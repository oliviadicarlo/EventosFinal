class EventsEnrollments
{
    id;
    id_event;
    id_user;
    description;
    registration_date_time;
    attended;
    observations;
    rating;
}

ConstructorEnrollments(i,ie,iu,d,rd,a,o,r)
{
    this.id = i;
    this.id_event = ie;
    this.id_user = iu;
    this.description =d ;
    this.registration_date_time = rd;
    this.attended = a;
    this.observations = o;
    this.rating = r;
}

export default EventsEnrollments