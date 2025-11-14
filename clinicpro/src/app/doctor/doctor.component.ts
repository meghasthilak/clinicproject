import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAppointmentService } from '../book-appointment.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  staffId: number | null = null;
  appointments: any[] = [];
  currentDateAppointments: any[] = [];
  combinedData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: BookAppointmentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const staffIdParam = params.get('staffId');
      this.staffId = staffIdParam ? +staffIdParam : null;

      if (this.staffId !== null) {
        this.getAppointmentsData(this.staffId);
      }
    });

    this.fetchAndCombineData();
  }

  getAppointmentsData(staffId: number): void {
    this.appointmentService.getAppointmentsByStaffId(staffId).subscribe(
      (data) => {
        const currentDate = new Date();
        const formattedCurrentDate = this.formatDate(currentDate);

        this.appointments = data;
        this.currentDateAppointments = this.appointments.filter(
          (appointment) => {
            const appointmentDate = this.formatDate(new Date(appointment.appointment_date));
            return appointmentDate === formattedCurrentDate;
          }
        );
      },
      (error) => {
        console.error('Error fetching appointments', error);
      }
    );
  }

 fetchAndCombineData(): void {
  this.appointmentService.getdiagnosises().subscribe(
    (response) => {
      console.log('Diagnosis API response:', response);

      let diagnoses: any[] = [];

      if (Array.isArray(response)) {
        diagnoses = response;
      } else if (response && typeof response === 'object') {
        diagnoses = [response]; // ✅ Wrap single object into an array
      } else {
        console.error('Unexpected diagnoses structure:', response);
      }

      this.appointmentService.getPatientDetails().subscribe(
        (patientsResponse) => {
          const patients = patientsResponse.response || patientsResponse;

          this.combinedData = diagnoses.map((diag: any) => {
            const patient = patients.find((p: any) => p.register_id === diag.register_id);
            return {
              ...diag,
              patient: patient || null
            };
          });
        },
        (error) => {
          console.error('Error fetching patient details', error);
        }
      );
    },
    (error) => {
      console.error('Error fetching diagnosis data', error);
    }
  );
}


  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  deleteAppointment(appointmentId: number): void {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(
      () => {
        this.getAppointmentsData(this.staffId!);
      },
      (error) => {
        console.error('Error deleting appointment', error);
      }
    );
  }

  takeDiagnosis(appointment: any): void {
    const registerId = appointment.register_id;
    if (registerId) {
      this.router.navigate(['/diagnosis', registerId]);
    }
  }

  goToPatientHistory(registerId: number): void {
    this.router.navigate(['/patient-history', registerId]);
  }

  goToPatientDetails(registerId: number): void {
    this.router.navigate(['/patient-details', registerId]);
  }

  isHighPriority(temp?: string | null, pulse?: string | null): boolean {
  const highTemp = 38;
  const lowTemp = 36;
  const highPulse = 100;
  const lowPulse = 60;

  // Clean and parse temperature like "29.3°C"
  const parsedTemp = temp ? parseFloat(temp.replace(/[^\d.]/g, '')) : null;

  // Clean and parse pulse like "98%"
  const parsedPulse = pulse ? parseFloat(pulse.replace(/[^\d.]/g, '')) : null;

  const isTempCritical = parsedTemp !== null && (parsedTemp > highTemp || parsedTemp < lowTemp);
  const isPulseCritical = parsedPulse !== null && (parsedPulse > highPulse || parsedPulse < lowPulse);

  return isTempCritical || isPulseCritical;
}


  shouldDisplayCard(temp?: string | null, pulse?: string | null): boolean {
  const hasValidTemp = temp && !isNaN(parseFloat(temp.replace(/[^\d.]/g, '')));
  const hasValidPulse = pulse && !isNaN(parseFloat(pulse.replace(/[^\d.]/g, '')));
  return Boolean(hasValidTemp || hasValidPulse);
}
 allocateAmbulance(item: any): void {
    const confirmAlloc = confirm('Allocate ambulance?');
    if (confirmAlloc) {
      alert('Ambulance allocated!');
      console.log('Ambulance allocated for register ID:', item.register_id);
      // Add backend call here if needed
    } else {
      alert('Ambulance allocation canceled.');
    }
  }


}
