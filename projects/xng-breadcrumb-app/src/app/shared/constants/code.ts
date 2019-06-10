export const dashboard = `
// 'dashboard' mapped to 'Home'
{
  path: 'dashboard',
  loadChildren: './dashboard/dashboard.module#DashboardModule',
  data: {
    breadcrumb: 'Home'
  }
}
//-----------------------------OR-----------------------------
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.set('dashboard', 'Home');`;

export const mentorList = `
// 'mentor' mapped to 'Mentors'
{
  path: 'mentor',
  loadChildren: './mentor/mentor.module#MentorModule',
  data: {
    breadcrumb: 'Mentors'
  }
}
//-----------------------------OR-----------------------------
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.set('mentor', 'Mentors');`;

export const mentorAdd = `
// 'add' mapped to 'New'
{
  path: 'add',
  component: MentorAddComponent,
  data: {
    breadcrumb: 'New'
  }
}
//-----------------------------OR-----------------------------
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.set('mentor/add', 'New');`;

export const mentorDetails = `
// path param 'id' is resolved later through BreadcrumbService
{
  path: ':id',
  component: MentorDetailsComponent,
}

// In MentorDetailsComponent 'id' is resolved to Mentor Name using a server response
// Breadcrumb is updated using BreadcrumbService.set() by passing the path

constructor(
  private dataService: DataService,
  private breadcrumbService: BreadcrumbService
) {}

ngOnInit() {
  this.dataService.getMentor(mentorId).subscribe(mentor => {
    this.breadcrumbService.set('mentor/:id', mentor.name)
  });
}`;

export const mentorEdit = `
// use 'skipBreadcrumb:true' for 'mentor/:id/edit' to skip the route from displaying in breadcrumb
{
  path: 'edit',
  component: MentorEditComponent,
  data: { skipBreadcrumb: true }
}
//-----------------------------OR-----------------------------
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.skip('mentor/:id/edit');`;

export const menteeList = `
// No mapping for 'mentee'. Hence breadcrumb is same as route i.e 'Mentee' with initial letter capitalized
{
  path: 'mentee',
  loadChildren: './mentee/mentee.module#MenteeModule'
}`;

export const menteeAdd = `
// 'add' mapped to 'New'
{
  path: 'add',
  component: MenteeAddComponent,
  data: {
    breadcrumb: 'New'
  }
}
//-----------------------------OR-----------------------------
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.set('mentee/add', 'New');`;

export const menteeDetails = `
// path param 'id' is resolved through BreadcrumbService using breadcrumbAlias
{
  path: ':id',
  component: MenteeDetailsComponent,
  data: {
    breadcrumbAlias: 'menteeName'
  }
}

// In MenteeDetailsComponent 'id' is resolved to Mentee Name using a server response
// Breadcrumb is updated using BreadcrumbService.setForAlias()

constructor(
  private dataService: DataService,
  private breadcrumbService: BreadcrumbService
) {}

ngOnInit() {
  this.dataService.getMentee(menteeId).subscribe(mentee => {
    this.breadcrumbService.setForAlias('menteeName', mentee.name)
  });
}`;

export const menteeEdit = `
// 'mentee/:id/edit' can be skipped from displaying in breadcrumb dynamically
{
  path: 'edit',
  component: MenteeEditComponent,
  data: { breadcrumbAlias: 'menteeEdit' }
}

// use BreadcrumbService skip() or skipForAlias() methods
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.skipForAlias('menteeEdit');
//-----------------------------OR-----------------------------
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.skip('mentee/:id/edit');`;

export const connect = `
// 'connect' mapped to 'Assign'
{
  path: 'connect',
  loadChildren: './connect/connect.module#ConnectModule',
  data: {
    breadcrumb: 'Assign'
  }
}
//-----------------------------OR-----------------------------
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.set('connect', 'Assign');`;
