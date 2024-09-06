import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent {
  constructor(private router:Router) { }
  flashcards = [
    { frontContent: 'Password Strength', backContent: 'Password strength is determined by length, complexity, unpredictability, and uniqueness. Strong passwords are at least 12-16 characters long, include a mix of letters, numbers, and symbols, and avoid common words or personal information. Unique passwords for each account prevent cascading breaches. Regularly updating passwords enhances security. Using a password manager can simplify managing complex passwords.' },
    
    { frontContent: 'Phishing', backContent: 'Phishing is a social engineering attack where attackers attempt to deceive individuals into providing sensitive information by masquerading as a trusted entity. This can be done through email, phone calls, or fake websites that look legitimate. Common phishing attempts include requests for login credentials or financial information.' },
    
    { frontContent: 'Encryption', backContent: 'Encryption is the process of converting data into a code to prevent unauthorized access. It uses algorithms to transform readable data (plaintext) into an unreadable format (ciphertext). Only authorized users with the correct decryption key can convert the data back to its original format. Encryption is crucial for securing sensitive data both at rest and in transit.' },
    
    { frontContent: 'Firewall', backContent: 'A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between a trusted internal network and untrusted external networks, such as the internet. Firewalls can be hardware-based, software-based, or a combination of both, and help protect against unauthorized access and cyberattacks.' },
    { frontContent: 'VPN (Virtual Private Network)', backContent: 'A VPN (Virtual Private Network) creates a secure, encrypted connection between your device and the internet. It masks your IP address, making your online activities more private and protecting your data from hackers, especially on public Wi-Fi networks. VPNs can also help you access region-restricted content by routing your traffic through servers in different locations.' },
    
    { frontContent: 'Malware', backContent: 'Malware (malicious software) is any software intentionally designed to cause damage to a computer, server, client, or network. Common types of malware include viruses, worms, trojans, ransomware, and spyware. Malware can steal personal information, damage files, and disrupt operations. Protecting against malware involves using antivirus software, keeping systems updated, and practicing safe browsing habits.' },
    
    
  ];
  
  goBack(){
    this.router.navigate(['/module101']);
  }
  
}
