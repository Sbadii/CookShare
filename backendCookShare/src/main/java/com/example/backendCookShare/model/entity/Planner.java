package com.example.backendCookShare.model.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "meal_planner")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MealPlannerEntry {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;          // ex : 2025-01-20
    private String meal;             // Breakfast / Lunch / Dinner (simple String)

    @ManyToOne
    private User user;

    @ManyToOne
    private Post post;
}
