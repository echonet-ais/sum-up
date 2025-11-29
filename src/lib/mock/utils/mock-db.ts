/**
 * 목 데이터베이스 유틸리티
 * 메모리 기반 데이터 저장소
 */

import type {
  User,
  Team,
  Project,
  Issue,
  Comment,
  Activity,
} from "@/types";

class MockDatabase {
  private users: Map<string, User> = new Map();
  private teams: Map<string, Team> = new Map();
  private projects: Map<string, Project> = new Map();
  private issues: Map<string, Issue> = new Map();
  private comments: Map<string, Comment> = new Map();
  private activities: Map<string, Activity> = new Map();

  // Users
  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  getUsers(): User[] {
    return Array.from(this.users.values());
  }

  createUser(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updated = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.users.set(id, updated);
    return updated;
  }

  deleteUser(id: string): boolean {
    return this.users.delete(id);
  }

  // Teams
  getTeam(id: string): Team | undefined {
    return this.teams.get(id);
  }

  getTeams(): Team[] {
    return Array.from(this.teams.values());
  }

  createTeam(team: Team): Team {
    this.teams.set(team.id, team);
    return team;
  }

  updateTeam(id: string, updates: Partial<Team>): Team | undefined {
    const team = this.teams.get(id);
    if (!team) return undefined;
    const updated = {
      ...team,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.teams.set(id, updated);
    return updated;
  }

  deleteTeam(id: string): boolean {
    return this.teams.delete(id);
  }

  // Projects
  getProject(id: string): Project | undefined {
    return this.projects.get(id);
  }

  getProjects(): Project[] {
    return Array.from(this.projects.values());
  }

  createProject(project: Project): Project {
    this.projects.set(project.id, project);
    return project;
  }

  updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const project = this.projects.get(id);
    if (!project) return undefined;
    const updated = {
      ...project,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.projects.set(id, updated);
    return updated;
  }

  deleteProject(id: string): boolean {
    return this.projects.delete(id);
  }

  // Issues
  getIssue(id: string): Issue | undefined {
    return this.issues.get(id);
  }

  getIssues(): Issue[] {
    return Array.from(this.issues.values());
  }

  createIssue(issue: Issue): Issue {
    this.issues.set(issue.id, issue);
    return issue;
  }

  updateIssue(id: string, updates: Partial<Issue>): Issue | undefined {
    const issue = this.issues.get(id);
    if (!issue) return undefined;
    const updated = {
      ...issue,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.issues.set(id, updated);
    return updated;
  }

  deleteIssue(id: string): boolean {
    return this.issues.delete(id);
  }

  // Comments
  getComment(id: string): Comment | undefined {
    return this.comments.get(id);
  }

  getComments(): Comment[] {
    return Array.from(this.comments.values());
  }

  createComment(comment: Comment): Comment {
    this.comments.set(comment.id, comment);
    return comment;
  }

  updateComment(id: string, updates: Partial<Comment>): Comment | undefined {
    const comment = this.comments.get(id);
    if (!comment) return undefined;
    const updated = {
      ...comment,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.comments.set(id, updated);
    return updated;
  }

  deleteComment(id: string): boolean {
    return this.comments.delete(id);
  }

  // Activities
  getActivity(id: string): Activity | undefined {
    return this.activities.get(id);
  }

  getActivities(): Activity[] {
    return Array.from(this.activities.values());
  }

  createActivity(activity: Activity): Activity {
    this.activities.set(activity.id, activity);
    return activity;
  }

  // 초기 데이터 로드
  initialize(initialData: {
    users?: User[];
    teams?: Team[];
    projects?: Project[];
    issues?: Issue[];
    comments?: Comment[];
    activities?: Activity[];
  }) {
    if (initialData.users) {
      initialData.users.forEach((user) => this.users.set(user.id, user));
    }
    if (initialData.teams) {
      initialData.teams.forEach((team) => this.teams.set(team.id, team));
    }
    if (initialData.projects) {
      initialData.projects.forEach((project) =>
        this.projects.set(project.id, project)
      );
    }
    if (initialData.issues) {
      initialData.issues.forEach((issue) => this.issues.set(issue.id, issue));
    }
    if (initialData.comments) {
      initialData.comments.forEach((comment) =>
        this.comments.set(comment.id, comment)
      );
    }
    if (initialData.activities) {
      initialData.activities.forEach((activity) =>
        this.activities.set(activity.id, activity)
      );
    }
  }

  // 데이터 초기화 (테스트용)
  reset() {
    this.users.clear();
    this.teams.clear();
    this.projects.clear();
    this.issues.clear();
    this.comments.clear();
    this.activities.clear();
  }
}

// 싱글톤 인스턴스
export const mockDb = new MockDatabase();

