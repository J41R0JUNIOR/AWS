import SwiftUI

struct PatientList: View {
    @Bindable private var api = CallApi.shared
    @Bindable var router = Router.shared
    @State private var isLoading = true
    @State private var errorMessage: String?
    
    @State var patientsLoaded: [Patient] = []

    var body: some View {
        VStack {
            Text("Patients list")
                .font(.headline)
            Spacer()
            
            if isLoading {
                ProgressView("Loading...")
                
                Spacer()
                
            } else if let errorMessage = errorMessage {
                Text("Erro: \(errorMessage)")
                    .foregroundColor(.red)
                
            } else {
                List(patientsLoaded) { patient in
                    Button{
                        router.push(.patientDetails(patient))
                    } label: {
                        Text(patient.name ?? "Nome indisponível")
                            .padding(.vertical, 4)
                    }
                }
                .refreshable(action: {
                    await loadPatients()
                })
                .listStyle(PlainListStyle())
            }
            
            Button("Create Patient") {
                router.push(.createPatient)
            }
            .buttonStyle(.borderedProminent)
        }
        .onAppear {
            Task {
                await loadPatients()
            }
        }
        .onDisappear {
            Task {
                await loadPatients()
            }
        }
        .padding()
    }

    private func loadPatients() async {
        do {
            if let patients: [Patient] = try await api.getAllPatients(){
                self.patientsLoaded = patients
            }
            isLoading = false
        } catch {
            errorMessage = error.localizedDescription
            isLoading = false
        }
    }
}

#Preview {
    PatientList().environmentObject(Router.shared)
}