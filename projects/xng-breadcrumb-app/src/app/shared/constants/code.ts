export const dashboard = `
// 'dashboard' mapped to 'Home'
{
  path: 'dashboard',
  loadChildren: './dashboard/dashboard.module#DashboardModule',
  data: { breadcrumb: 'Home' }
}

//-----------------------ALTERNATIVE------------------------

constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.set('dashboard', 'Home');`;

export const mentorList = `
// 'mentor' mapped to 'Enabler' using BreadcrumbService set()
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.set('mentor', 'Mentors');

//-----------------------ALTERNATIVE------------------------

{
  path: 'mentor',
  loadChildren: './mentor/mentor.module#MentorModule',
  data: { breadcrumb: 'Mentors' }
}`;

export const mentorAdd = `
// 'mentor/add' mapped to 'New' using BreadcrumbService set()
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.set('mentor/add', 'New');

//-----------------------ALTERNATIVE------------------------

{
  path: 'add',
  component: MentorAddComponent,
  data: { breadcrumb: 'New' }
}`;

export const mentorDetails = `
// path param 'id' in 'mentor/:id' is resolved later using BreadcrumbService
{
  path: ':id',
  component: MentorDetailsComponent,
}

// In MentorDetailsComponent 'id' is resolved to Mentor Name using a server response
// Breadcrumb is updated using by passing the route path

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
// Skip 'edit' in 'mentor/:id/edit' from displaying in breadcrumb
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.skip('mentor/:id/edit');

//-----------------------ALTERNATIVE------------------------

// use 'skipBreadcrumb:true' for 'mentor/:id/edit' to skip the route from displaying in breadcrumb
{
  path: 'edit',
  component: MentorEditComponent,
  data: { skipBreadcrumb: true }
}`;

export const menteeList = `
// 'mentee' is mapped to 'Mentee' in route configuration
{
  path: 'mentee',
  loadChildren: './mentee/mentee.module#MenteeModule',
  data: { breadcrumb: 'Mentee' }
}`;

export const menteeAdd = `
// 'mentee/add' is mapped to 'New'
{
  path: 'add',
  component: MenteeAddComponent,
  data: { breadcrumb: 'New' }
}

//-----------------------ALTERNATIVE------------------------

constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.set('mentee/add', 'New');`;

export const menteeDetails = `
// path param 'id' in 'mentee/:id' is resolved through BreadcrumbService using breadcrumbAlias
{
  path: ':id',
  data: {
    breadcrumbAlias: 'menteeName'
  },
  children: [
    {
      path: '',
      component: MenteeDetailsComponent
    }
  ]
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
  path: ':id',
  data: {
    breadcrumbAlias: 'menteeName'
  },
  children: [
    {
      path: 'edit',
      component: MenteeEditComponent,
      data: { breadcrumbAlias: 'menteeEdit' }
    }
  ]
}

//-----------------------ALTERNATIVE------------------------

// use BreadcrumbService skip() or skipForAlias() methods
constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.skipForAlias('menteeEdit');

//-----------------------ALTERNATIVE------------------------

constructor(private breadcrumbService: BreadcrumbService) {}
this.breadcrumbService.skip('mentee/:id/edit');`;

export const connect = `
// No mapping for 'connect'. Hence breadcrumb is same as route i.e 'connect'
{
  path: 'connect',
  loadChildren: './connect/connect.module#ConnectModule',
}`;
