package com.example.backendCookShare.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "meal_planner_entries")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MealPlannerEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Date planifiée (ex: 2025-02-20)
    @Column(nullable = false)
    private LocalDate date;

    // Type de repas (breakfast, lunch, dinner, snack)
    @Column(nullable = false)
    private String mealType;

    /***************************************
     *               RELATIONS
     ***************************************/

    // Un user peut avoir plusieurs entrées de planner
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Chaque entrée du planner correspond à un post
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
}
