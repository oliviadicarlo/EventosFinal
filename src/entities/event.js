class Events{
    id;
    name;
    description;
    id_event_category;
    id_event_location;
    start_date;
    duration_in_minutes;
    price;
    enabled_for_enrollment;
    max_assitance;
    id_creator_user;
}

ConstructorEvents(i,n,d,idc,idl,s,dm,p,e,ma,iu)
{
    this.id = i
    this.name = n;
    this.description = d;
    this.id_event_category = idc;
    this.id_event_location = idl;
    this.start_date =s;
    this.duration_in_minutes = dm;
    this.price = p;
    this.enabled_for_enrollment = e;
    this.max_assitance = ma;
    this.id_creator_user = iu;
}
export default Events;