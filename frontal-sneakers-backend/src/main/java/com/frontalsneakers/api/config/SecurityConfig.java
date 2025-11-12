package com.frontalsneakers.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        // 1. Libera o acesso ao H2 Console
                        .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll()

                        // 2. Exige autenticação para todas as outras URLs
                        .anyRequest().authenticated()
                )
                // 3. Habilita o login via formulário padrão do Spring Security
                .formLogin(withDefaults());

        // 4. Desabilita o CSRF (Cross-Site Request Forgery) APENAS para o H2 Console
        // O H2 Console usa POSTs que podem ser bloqueados pelo CSRF
        http.csrf(csrf -> csrf
                .ignoringRequestMatchers(new AntPathRequestMatcher("/h2-console/**"))
        );

        // 5. Permite que o H2 Console seja renderizado dentro de um <frame>
        // O console do H2 é carregado em um frame, e o Spring Security bloqueia isso
        // por padrão (para evitar ataques de "clickjacking")
        http.headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.sameOrigin())
        );

        return http.build();
    }
}
